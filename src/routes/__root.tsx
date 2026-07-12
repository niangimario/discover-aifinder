import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Discover AI — Rastrea a cualquier persona en línea por su nombre" },
      { name: "description", content: "Discover AI: descubre apps de citas, cuentas falsas y la última actividad en línea de alguien solo con su nombre, nacionalidad y ciudad." },
      { name: "author", content: "Discover AI" },
      { property: "og:title", content: "Discover AI — Rastrea a cualquier persona en línea por su nombre" },
      { property: "og:description", content: "Discover AI: descubre apps de citas, cuentas falsas y la última actividad en línea de alguien solo con su nombre, nacionalidad y ciudad." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Discover AI — Rastrea a cualquier persona en línea por su nombre" },
      { name: "twitter:description", content: "Discover AI: descubre apps de citas, cuentas falsas y la última actividad en línea de alguien solo con su nombre, nacionalidad y ciudad." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/25874985-cb32-4ee6-95d2-8779c1236020/id-preview-019f0eb0--51fb8a54-3c74-46e8-b699-ab767b647833.lovable.app-1783623675736.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/25874985-cb32-4ee6-95d2-8779c1236020/id-preview-019f0eb0--51fb8a54-3c74-46e8-b699-ab767b647833.lovable.app-1783623675736.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '1346186220289075');fbq('track', 'PageView');`,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1346186220289075&ev=PageView&noscript=1"
          />
        </noscript>
        {/* End Meta Pixel Code */}
      </head>
      <body>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                (function(){
                  try{
                    document.addEventListener('change', function(e){
                      try{
                        var t = e.target;
                        if(!t || t.id !== 'file-input') return;
                        var f = t.files && t.files[0];
                        if(!f) return;
                        var label = document.querySelector('label[for="file-input"]');
                        if(!label) return;
                        var existing = label.querySelector('img.preview-fallback');
                        if(!existing){
                          existing = document.createElement('img');
                          existing.className = 'preview-fallback';
                          existing.style.width = '100%';
                          existing.style.height = '100%';
                          existing.style.objectFit = 'cover';
                          existing.style.display = 'block';
                          existing.style.borderRadius = '12px';
                          existing.style.boxSizing = 'border-box';
                          existing.style.pointerEvents = 'none';
                          label.insertBefore(existing, label.firstChild);
                        }
                        try{ URL.revokeObjectURL(existing.src); }catch(e){}
                        existing.src = URL.createObjectURL(f);
                        // ensure the clear button is clickable above the invisible input
                        var clearBtn = label.querySelector('span');
                        if(clearBtn){ clearBtn.style.zIndex = 5; clearBtn.style.pointerEvents = 'auto'; }
                      }catch(err){console.error('preview-fallback error', err)}
                    });
                    // remove preview when the clear button (✕) is clicked
                    document.addEventListener('click', function(e){
                      var el = e.target;
                      if(!el) return;
                      if(el.innerText === '✕' || el.textContent === '✕'){
                        var label = document.querySelector('label[for="file-input"]');
                        var img = label && label.querySelector('img.preview-fallback');
                        if(img){ try{ URL.revokeObjectURL(img.src); }catch(e){} img.remove(); }
                      }
                    });
                  }catch(e){console.error(e)}
                })();
              `,
              }}
            />
            {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
