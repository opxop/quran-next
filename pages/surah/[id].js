import Link from 'next/link';

export default function Surah({ surah }) {
  return (
    <main className="flex flex-col justify-center items-center p-6">
      <div className="flex items-center">
        <Link href="/">
          <a className="border p-1 rounded mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </a>
        </Link>
        <h1 className="text-3xl py-5 font-serif">{surah.data.name.long}</h1>
      </div>

      {surah.data.verses.map(({ text, translation, number }) => (
        <div
          className="border rounded-sm shadow-sm p-3 my-1 w-[350px]"
          key={number.insurah}
        >
          <span></span>
          <div>
            <p className="font-serif text-2xl py-1.5 text-right leading-loose">
              {text.arab}
            </p>
            <div className="text-left text-sm text-gray-500 italic pb-1">
              Terjemah:
              <p className="text-sm not-italic text-gray-800">
                {translation.id}
              </p>
            </div>
          </div>
        </div>
      ))}
    </main>
  );
}

export async function getStaticPaths() {
  const res = await fetch('https://api.quran.sutanlab.id/surah');
  const data = await res.json();

  const paths = data.data.map((surah) => `/surah/${surah.number}`);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://api.quran.sutanlab.id/surah/${params.id}`);
  const surah = await res.json();

  return {
    props: { surah },
  };
}
