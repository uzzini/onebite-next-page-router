// 주문형 재검증 ( On-Demand-ISR )
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await res.revalidate('/'); // 어떤 페이지를 revalidate 하려고 하는지 경로 전달
    return res.json({ revalidate: true });
  } catch (err) {
    res.status(500).send("Revalidation Failed");
  }
}