import "../../../styles/article/article-detail.scss";

export interface RecommendedArticle {
  id: number;
  title: string;
  source: string;
  image: string;
  link: string;
}
interface RecommendedArticlesProps {
  articles?: RecommendedArticle[];
}
const mockArticles: RecommendedArticle[] = [
  {
    id: 1,
    source: "Giáo dục và Thời đại",
    title:
      "Mở rộng nguồn bồi dưỡng nghiệp vụ sư phạm, khắc phục tình trạng thiếu giáo viên",
    image: "https://s-img.mgid.com/g/28212041/492x277/-/aHR0cHM6Ly9jbC5pbWdob3N0cy5jb20vaW1naC9pbWFnZS9mZXRjaC9hcl8xNjo5LGNfZmlsbCxlX3NoYXJwZW46MTAwLGZfanBnLGdfZmFjZXM6YXV0byxxX2F1dG86Z29vZCx3XzEwMjAvaHR0cHM6Ly9pbWdob3N0cy5jb20vdC8yMDI2LTEwLzcwMDMwNS84NTVkNDM2Zjk5ZjNkOTViY2Q1YmQwNGYzZDE1MmM3ZC5wbmc.webp?v=1793716642-trCBKAI_dKPaIIsIMoqC8TC2ApFZfMu966Z4WregMsQ",
    link: "#",
  },
  {
    id: 2,
    source: "Giáo dục và Thời đại",
    title:
      "Đại diện đứng vai, đồng hành cùng nhà trường: Cầu nối tin cậy, hỗ trợ thiết thực",
    image: "https://s-img.mgid.com/l/714637/492x277/-/aHR0cHM6Ly9jZG4uZ2lhb2R1Y3Rob2lkYWkudm4vaW1hZ2VzLzVvdlFybjRLVFM2RTVGSEcyMmp5MUo1N2FtenFYUTZwd3RqTHM0YjBIMExiZm1QbkpxcnZOc2w2a0FVaXk3MTJlU2pLMDFrdmtudUdaVXFaX2lVSjJxUWdDajJQWnJPRHE3VjlVVjBLaUFQZTByMXNOaDVZWVk2TGJFc1Y1RDQydnJDZW5pOGJyZVBsWm9WQUpXOHRVdnRMb3hjbTgzSGZtUURnQl9SM0pHdy8xNzkxNzg5NzE0NzkyLTM3MTkzNzQxNzg1ODMzOTk5MjQtMzcxOTM3NDE3ODU4MzM5OTkyNC05MjM3MGYxODc1ZDU4NWRmYWQ0NDJhOTY2ZWVhZWM2Ni5qcGcud2VicA.webp?v=1793716642--SspbjSRTkUxLKPPcb4IP2wlfSENCMxOOcOaxoqhy9s",
    link: "#",
  },
  {
    id: 3,
    source: "Giáo dục và Thời đại",
    title: "Đổi mới phương pháp dạy học, nâng cao chất lượng giáo dục",
    image: "https://s-img.mgid.com/l/714637/492x277/-/aHR0cHM6Ly9jZG4uZ2lhb2R1Y3Rob2lkYWkudm4vaW1hZ2VzLzVvdlFybjRLVFM2RTVGSEcyMmp5MUo1N2FtenFYUTZwd3RqTHM0YjBIMExiZm1QbkpxcnZOc2w2a0FVaXk3MTJlU2pLMDFrdmtudUdaVXFaX2lVSjJxUWdDajJQWnJPRHE3VjlVVjBLaUFQZTByMXNOaDVZWVk2TGJFc1Y1RDQydnJDZW5pOGJyZVBsWm9WQUpXOHRVdnRMb3hjbTgzSGZtUURnQl9SM0pHdy8xNzkxNzg5NzE0NzkyLTM3MTkzNzQxNzg1ODMzOTk5MjQtMzcxOTM3NDE3ODU4MzM5OTkyNC05MjM3MGYxODc1ZDU4NWRmYWQ0NDJhOTY2ZWVhZWM2Ni5qcGcud2VicA.webp?v=1793716642--SspbjSRTkUxLKPPcb4IP2wlfSENCMxOOcOaxoqhy9s",
    link: "#",
  },
];
const RecommendedArticles = ({articles = mockArticles,
}: RecommendedArticlesProps) => {
  if (!articles.length) return null;

  return (
    <section className="recommended-articles">
      <div className="recommended-articles__header">
        <h2 className="recommended-articles__heading">DÀNH CHO BẠN</h2>
        <div className="recommended-articles__line" />
      </div>
      <div className="recommended-articles__grid">
        {articles.map((article) => (
          <a key={article.id} href={article.link} className="recommended-articles__card">
            <div className="recommended-articles__image-wrapper">
              <img src={article.image}alt={article.title}
                className="recommended-articles__image"
                loading="lazy" />
            </div>
            <span className="recommended-articles__source">
              {article.source}
            </span>
            <h3 className="recommended-articles__title">{article.title}</h3>
          </a>
        ))}
      </div>
    </section>
  );
};

export default RecommendedArticles;