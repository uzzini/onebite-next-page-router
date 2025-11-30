import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react"
import style from "./searchable-layout.module.css";

export default function SearchableLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const q = router.query.q as string;

  // query string 값이 변하면 setSearch 함수 호출해서 search state(검색어)를 q의 값으로 설정
  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  // React.ChangeEvent<HTMLInputElement>: HTMLInputElement에서 발생한 ChangeEvent 객체 타입
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if(!search || q === search) return; // 검색어가 없거나 query string 값이 검색어와 같다면 컴포넌트 교체 X
    router.push(`/search?q=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div>
      <div className={style.searchbar_container}>
        <input
          value={search} onChange={onChangeSearch}
          onKeyDown={onKeyDown}
          placeholder="검색어를 입력하세요..."
        />
        <button onClick={onSubmit}>검색</button>
      </div>
      {children}
    </div>
  )
}