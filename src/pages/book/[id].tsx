import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import style from "./[id].module.css";
import fetchOneBook from "@/lib/fetch-one-book";
import { useRouter } from "next/router";
import Head from "next/head";

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: "1" }},
      { params: { id: "2" }},
      { params: { id: "3" }},
    ],
    fallback: true // 대체 옵션
    // fallback: false 👉 paths에 명시해두지 않은 경로의 요청은 404 Not Found 페이지 반환
    // fallback: "blocking" 👉 즉시 생성 ( Like SSR )
    // fallback: true 👉 즉시 생성 + 페이지만 미리 반환
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id; // URL Parameter
  const book = await fetchOneBook(Number(id));

  // 존재하지 않는 데이터의 페이지로 들어왔을 때 Not Found 페이지로 보내고 싶다면
  if (!book) {
    return {
      notFound: true
    };
  }

  return {
    props: { book }
  };
};

export default function Page({
  book
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) { // fallback 상태
    return (
      <>
        <Head>
          <meta property="og:image" content="/thumbnail.png" />
          <meta property="og:title" content="한입북스" />
          <meta property="og:description" content="한입북스에 등록된 도서들을 만나보세요." />
        </Head>
        <div>로딩중입니다.</div>
      </>
    );
  }
  if (!book) return "문제가 발생했습니다. 다시 시도하세요.";

  const {
    id, title, subTitle, description, author, publisher, coverImgUrl
  } = book;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={coverImgUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <div className={style.container}>
        <div
          className={style.cover_img_container}
          style={{backgroundImage: `url("${coverImgUrl}")`}}
        >
          <img src={coverImgUrl} />
        </div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <div className={style.author}>{author} | {publisher}</div>
        <div className={style.description}>{description}</div>
      </div>
    </>
  );
}