import { auth, signIn, signOut } from "auth";
import Link from "next/link";
import { getUserByEmail } from "../actions";
import Image from "next/image";

type navItems = {
  href: string;
  text: string;
};

async function Navbar() {
  const session = await auth();

  const user = await getUserByEmail(session?.user.email);

  const navItems: navItems[] = [
    {
      href: "/profile",
      text: "Perfil",
    },
    {
      href: "/post/new",
      text: "Criar postagens",
    },
    {
      href: "/myposts",
      text: "Minhas postagens",
    },
  ];

  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link
        href="/"
        className="text-white text-lg font-bold hover:text-zinc-200"
      >
        NextGram
      </Link>
      <div>
        {user ? (
          <div className="flex gap-4 items-center">
            <ul className="flex gap-4">
              {navItems.map((items, index) => (
                <Link href={items.href} key={index}>
                  <li className="text-white font-medium hover:text-zinc-200">
                    {items.text}
                  </li>
                </Link>
              ))}
            </ul>
            <p>{user.name}</p>
            {user.image && (
              <Image
                src={user.image}
                alt={`perfil de: ${user.name}`}
                className="w-10 h-10 rounded-full"
                width={40}
                height={40}
              />
            )}

            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
              >
                Sair
              </button>
            </form>
          </div>
        ) : (
          <Link
            href={"/signin"}
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Entrar
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
