# HTTPS and Reverse Proxy

***TrustSource CE*** speaks plain HTTP on port 3000, and the reference compose file publishes that port on `127.0.0.1` only. To serve users, put a reverse proxy that terminates TLS in front of it - nginx, Caddy, Traefik or a load balancer.

> [!WARNING]
> Without TLS, passwords, session tokens and API keys travel unencrypted. Do not publish port 3000 to other machines (`TS_BIND_ADDRESS=0.0.0.0`) without HTTPS in front of it.

## What the proxy and the app need

1. **Set `ROOT_URL`** to the HTTPS address users open, with a trailing slash, for example:

    ```
    ROOT_URL=https://ts.example.org/
    ```

    Links in emails, reports and generated documents are built from it, and live connections from any other origin are refused.

2. **Forward WebSocket upgrades.** The app keeps a live connection to the browser on `/websocket` and `/sockjs`. The proxy must pass the `Upgrade` and `Connection` headers through.

3. **Send `X-Forwarded-Proto`.** With an `https` `ROOT_URL`, a request the proxy received over plain HTTP (`X-Forwarded-Proto: http`) is redirected to the HTTPS address. `/healthcheck` is never redirected.

4. **Keep port 3000 local.** With the proxy on the same host, leave `TS_BIND_ADDRESS` at its default `127.0.0.1`. If the proxy runs elsewhere, set `TS_BIND_ADDRESS` to an address only the proxy can reach. Do not rely on a host firewall such as ufw instead: ports that Docker publishes bypass it, so `TS_BIND_ADDRESS` is what decides who can reach port 3000.

5. **Allow large enough uploads.** The REST API accepts files up to 50 MB by default (`TS_UPLOAD_MAX_MB`). Set the proxy's request body limit at least as high.

After changing `.env`, run `docker compose up -d`.

## Additional origins

Users can only use the app from the origin of `ROOT_URL`. If the same installation must also be opened under a second address, for example an internal host name, list it in `TS_ALLOWED_DDP_ORIGINS`:

```
TS_ALLOWED_DDP_ORIGINS=https://ts.internal.example
```

Links in emails still use `ROOT_URL`.

## Example: nginx

```nginx
# In the http context
map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}

server {
    listen 80;
    server_name ts.example.org;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name ts.example.org;

    ssl_certificate     /etc/ssl/ts.example.org/fullchain.pem;
    ssl_certificate_key /etc/ssl/ts.example.org/privkey.pem;
    ssl_protocols       TLSv1.2 TLSv1.3;

    client_max_body_size 50m;

    location / {
        proxy_pass         http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection $connection_upgrade;
        proxy_set_header   Host $host;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_read_timeout 300s;
    }
}
```

`client_max_body_size` matters: nginx's default of 1 MB would reject most SBOM uploads before they reach the app.

## Example: Caddy

Caddy obtains a certificate itself, forwards WebSocket upgrades and sets `X-Forwarded-Proto` by default:

```
ts.example.org {
    reverse_proxy 127.0.0.1:3000
}
```

## Proxy in a container

If the proxy runs as a container, `127.0.0.1:3000` is the proxy container itself, not the host. Either attach the proxy to the compose network and use `http://ts_core:3000`, or publish the app on an address the proxy container can reach with `TS_BIND_ADDRESS`.

## Client addresses behind the proxy

Sign-in, password reset and sign-up are rate-limited per client IP address: 20 attempts per minute across the sign-in and password methods, and 10 sign-ups per hour. If the app sees only the proxy's address, all users behind the proxy share these limits.

Sending `X-Forwarded-For` from the proxy, as in the nginx example, is not enough on its own. The app takes the client address from that header only when `HTTP_FORWARDED_COUNT` is set to the number of proxies in front of it, usually `1`. The compose file does not pass this setting, so add it for the app service in a `docker-compose.override.yml` next to `docker-compose.yml` (if you already have one, for example to disable Mailpit, add the entry to it):

```yaml
services:
  ts_core:
    environment:
      - HTTP_FORWARDED_COUNT=1
```

Then run `docker compose up -d`.

> [!WARNING]
> Set `HTTP_FORWARDED_COUNT` to the real number of proxies. With a value that is too high, the app reads an address the client wrote into `X-Forwarded-For` itself, so clients can fake their IP address and get around the rate limits. Without any proxy in front, do not set it. Set it only when port 3000 can be reached exclusively through the proxy (see step 4 above); otherwise a client can connect to the app directly and send its own `X-Forwarded-For`.

## Security headers

The app sets its own security headers, among them a Content Security Policy and `Strict-Transport-Security` for one year including subdomains. Once users have opened the installation over HTTPS, their browsers will only connect to that host name, and its subdomains, over HTTPS.

## Check the setup

1. Open `https://ts.example.org/` and sign in.
2. Open a module page and check that data loads and updates without a page reload - this needs the WebSocket connection.
3. Open `http://ts.example.org/`: you should be redirected to HTTPS.
4. Send yourself a password reset email and check that its link starts with your `ROOT_URL`.

If the app loads but shows no data, or keeps reloading, see [Installation Troubleshooting](../11-troubleshooting-faq/05-installation-troubleshooting.md).

## Related

- [Settings Reference](03-environment-variables.md)
- [Backups & Monitoring](07-backups-monitoring.md) - the `/healthcheck` endpoint for your load balancer
