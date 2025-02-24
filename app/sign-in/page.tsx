"use client";

import { signIn } from "next-auth/react";

import { Breadcrumbs } from "~/components/Breadcrumbs";
import { trackCustomEvent } from "~/src/plausible/events";
import { Route } from "~/src/routing";
import { devMode } from "~/src/utils";

const Page = () => {
  const handleSignIn = async () => {
    trackCustomEvent("SignIn");
    await signIn("slack", { callbackUrl: "/" });
  };

  return (
    <main className="m-auto max-w-content px-7 py-20">
      <Breadcrumbs
        path={[{ label: "Homepage", path: "/" }]}
        currentPage="Přihlásit se"
      />
      <section className="m-auto mt-10 flex max-w-[80ex] flex-col gap-7 rounded-2xl border-2 border-gray p-7 pb-10 text-center lg:mt-20">
        <h1 className="typo-title">Přihlásit se</h1>
        <p className="pb-4">
          K přihlašování k tomuto webu momentálně používáme Slackový účet
          Česko.Digital. (Na jednodušším řešení pracujeme.) Už jsi v našem
          Slacku?
        </p>
        <div>
          <a onClick={handleSignIn} className="btn-primary">
            Jsem, chci se přihlásit
          </a>
        </div>
        <div className="flex flex-col gap-2">
          <a href={Route.register} className="typo-link typo-caption block">
            Nejsem, chci se registrovat
          </a>
          {devMode() && <DevSignInButton />}
        </div>
      </section>
    </main>
  );
};

const DevSignInButton = () => (
  <a
    className="typo-link typo-caption block cursor-pointer opacity-50"
    onClick={async () =>
      await signIn("credentials", { callbackUrl: Route.userProfile })
    }
  >
    Testovací přihlášení
  </a>
);

export default Page;
