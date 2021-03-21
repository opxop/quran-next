import Head from 'next/head';
import Link from 'next/link';

export default function Home({ quran }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col justify-center items-center">
        <h1 className="text-lg py-5 font-bold">QUR'AN</h1>
        {quran.data.map((surah) => (
          <Link href={`/surah/${surah.number}`} key={surah.number}>
            <a>
              <div className="flex justify-between border rounded bg-white p-3 my-1 w-[350px]">
                <section className="flex justify-start items-center">
                  <div className="border text-xs px-2 py-1 rounded">
                    {surah.number}
                  </div>
                  <div className=" ml-3 flex flex-col justify-start items-start">
                    <h2 className="font-medium">
                      {surah.name.transliteration.id}
                    </h2>
                    <h3 className="text-xs text-gray-500">
                      {surah.name.translation.id}
                      <span className="font-normal ml-1">
                        ({surah.numberOfVerses})
                      </span>
                    </h3>
                  </div>
                </section>
                <section className="flex items-center">
                  <h3 className="font-serif text-2xl">{surah.name.short}</h3>
                </section>
              </div>
            </a>
          </Link>
        ))}
      </main>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch('https://api.quran.sutanlab.id/surah');
  const quran = await res.json();

  return {
    props: {
      quran,
    },
  };
}
