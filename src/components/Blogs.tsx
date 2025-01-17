"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "../../lib/formatDate";
import { Clock, Calendar, ArrowUpRight } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function Blogs({ blogs }: { blogs: any[] }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
    >
      {blogs.map((blog) => (
        <Link key={blog.slug} href={`/blog/${blog.slug}`}>
          <motion.article
            variants={item}
            className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800/80"
          >
            {blog.image && (
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            )}

            <div className="flex flex-1 flex-col justify-between p-6">
              <div className="flex-1">
                <div className="flex items-center gap-4 text-xs text-zinc-600 dark:text-zinc-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <time dateTime={blog.date}>{formatDate(blog.date)}</time>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{Math.ceil(blog.content?.split(/\s+/).length / 200) || 5} min read</span>
                  </div>
                </div>

                <div className="mt-4 block">
                  <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                    {blog.title}
                  </h3>
                  <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                    {blog.description}
                  </p>
                </div>

                {blog.tags && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {blog.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-800 dark:bg-zinc-700 dark:text-zinc-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6 flex items-center gap-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Read article
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </div>
          </motion.article>
        </Link>
      ))}
    </motion.div>
  );
}
