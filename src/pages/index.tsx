// CSS Module
import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode } from "react";
import BookItem from "@/components/book-item";
import { InferGetServerSidePropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";

// Server Side Rendering ( SSR )
// getServerSideProps: 페이지 요청 시 서버에서 실행되어,
// 페이지 컴포넌트에 필요한 데이터를 미리 fetch해 props로 전달하는 함수
export const getServerSideProps = async () => {
  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks()
  ]);

  return {
    props: { allBooks, recoBooks }
  };
};

export default function Home({
  allBooks, recoBooks
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {recoBooks.map((book) => <BookItem key={book.id} {...book} />)}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {allBooks.map((book) => <BookItem key={book.id} {...book} />)}
      </section>
    </div>
  );
}

Home.getLayout = ( page: ReactNode ) => {
  return <SearchableLayout>{page}</SearchableLayout>
};