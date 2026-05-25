"use client";
import Link from "next/link";
const Navbar = () => {
return (
<nav className="w-full bg-black text-white px-6 py-4 flex items-center 
justify-between">
<Link href="/home">
<h1 className="text-2xl font-bold">
News Aggregator
</h1>
</Link>
<div className="flex gap-6 items-center">
<Link href="/search">
Search
</Link>
<Link href="/bookmarks">
Bookmarks
</Link>
<Link href="/login">
Login
</Link>
</div>
</nav>
);
};
export default Navbar;