import SearchableLayout from "@/components/searchable-layout";
import { ReactNode, useEffect, useState } from "react";
import BookItem from "@/components/book-item";
import fetchBooks from "@/lib/fetch-books";
import { useRouter } from "next/router";
import { BookData } from "@/types";

// export const getStaticProps = async (context: GetStaticPropsContext) => {
//   const q = context.query.q; // Query String
//   ‼️ Error : Property 'query' does not exist on type 'GetStaticPropsContext'
// 	 빌드 타임에 getStaticProps 함수 안에서 어떤 값이 query string의 값으로 들어올지 알아낼 방법 X
//   const books = await fetchBooks(q as string);

//   return {
//     props: { books }
//   };
// };

// useRouter() Hook을 이용해 query string 값을 꺼내와
// 브라우저 환경( 클라이언트 사이드 측 )에서 데이터( 검색 결과 )가 렌더링 될 수 있도록 구현
export default function Page() {
  const [books, setBooks] = useState<BookData[]>([]);
  
  const router = useRouter();
  const q = router.query.q;

  const fetchSearchResult = async () => {
    const data = await fetchBooks(q as string);
    setBooks(data);
  };

  useEffect(() => {
    if (q) {
      fetchSearchResult();
    }
  }, [q]);

  return (
    <div>
      {books.map((book) => <BookItem key={book.id} {...book} />)}
    </div>
  );
}

Page.getLayout = ( page: ReactNode ) => {
  return <SearchableLayout>{page}</SearchableLayout>
};