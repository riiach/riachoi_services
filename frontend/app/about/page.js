import Link from "next/link";

export default function About() {
    return (
        <main className="bg-background text-foreground flex min-h-screen items-center justify-center px-6 -mt-16">
            <section className="bg-primary flex w-full max-w-3xl flex-col items-center gap-8 rounded-[2rem] p-8 text-center shadow-[0_1px_2px_rgba(0,0,0,0.08)] md:p-14">
                <div className="relative h-60 overflow-hidden flex items-center justify-center">
                    <PixelCatLoader />
                </div>

                <div className="flex flex-col gap-4">
                    <p className="text-accent text-sm font-medium tracking-[0.3em] uppercase">
                        Currently Updating
                    </p>

                    <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
                        This page is getting a little upgrade.
                    </h1>

                    <p className="text-muted-foreground mx-auto max-w-xl text-base leading-7 md:text-lg">
                        I’m making a few improvements behind the scenes. Please check back
                        soon for the updated page.
                    </p>
                </div>

                <Link
                    href="/"
                    className="bg-accent text-primary rounded-full px-6 py-3 text-sm font-medium transition-transform duration-200 hover:scale-105"
                >
                    Back to Home
                </Link>
            </section>
        </main>
    );
}

function PixelCatLoader() {
    return (
        <div className="relative flex h-[320px] w-[320px] items-center justify-center">
            {/* floating hearts */}
            <span className="heart heart-1" />
            <span className="heart heart-2" />
            <span className="heart heart-3" />

            {/* cat */}
            <div className="pixel-cat">
                <div className="ear left-ear" />
                <div className="ear right-ear" />

                <div className="face">
                    <div className="eye left-eye" />
                    <div className="eye right-eye" />

                    <div className="mouth">
                        <span />
                    </div>

                    <div className="whiskers whiskers-left">
                        <span />
                        <span />
                    </div>

                    <div className="whiskers whiskers-right">
                        <span />
                        <span />
                    </div>
                </div>

                <div className="body">
                    <div className="leg left-leg" />
                    <div className="leg right-leg" />

                    <div className="tail" />
                </div>
            </div>
        </div>
    );
}