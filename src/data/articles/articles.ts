import type { Article } from "@/types/article";

export const articles: Article[] = [
  {
    id: 1,
    slug: "doi-moi-phuong-phap-hoc-tap",
    title:
      "Đổi mới phương pháp học tập: Khơi dậy sự chủ động và sáng tạo của học sinh",
    description:
      "Việc đổi mới phương pháp dạy và học góp phần tạo môi trường học tập tích cực, khuyến khích học sinh chủ động khám phá kiến thức và phát triển năng lực.",
    category: "Giáo dục",
    author: "Ban biên tập",
    source: "Tin giáo dục mẫu",
    publishedAt: "2026-10-29T08:30:00+07:00",
    image: null,
    imageAlt: "Minh họa hoạt động học tập của học sinh",
    imageCaption: "Hình ảnh minh họa cho bài viết.",
    content: [
      {
        type: "paragraph",
        text:
          "Trong môi trường giáo dục hiện đại, học sinh cần được khuyến khích tham gia tích cực vào quá trình học tập. Giáo viên không chỉ truyền đạt kiến thức mà còn hướng dẫn học sinh tìm tòi, đặt câu hỏi và giải quyết vấn đề.",
      },
      {
        type: "heading",
        text: "Tăng cường hoạt động học tập chủ động",
      },
      {
        type: "paragraph",
        text:
          "Các hoạt động thảo luận nhóm, thực hành và giải quyết tình huống giúp học sinh vận dụng kiến thức vào thực tế. Việc lựa chọn phương pháp phù hợp cần dựa trên mục tiêu bài học và đặc điểm của người học.",
      },
      {
        type: "heading",
        text: "Ứng dụng công nghệ có định hướng",
      },
      {
        type: "paragraph",
        text:
          "Công nghệ có thể hỗ trợ tìm kiếm tài liệu, tổ chức hoạt động và cung cấp phản hồi. Tuy nhiên, công cụ số cần được sử dụng có mục đích, kết hợp với tư duy phản biện và sự hướng dẫn của giáo viên.",
      },
    ],
    relatedSlugs: [
      "ky-nang-tu-hoc-hieu-qua",
      "ung-dung-cong-nghe-trong-lop-hoc",
    ],
    popular: true,
  },
  {
    id: 2,
    slug: "ky-nang-tu-hoc-hieu-qua",
    title: "Những kỹ năng cần thiết để xây dựng thói quen tự học hiệu quả",
    description:
      "Lập kế hoạch, quản lý thời gian và tự đánh giá là những kỹ năng quan trọng giúp người học duy trì tiến độ.",
    category: "Kỹ năng học tập",
    author: "Ban biên tập",
    source: "Tin giáo dục mẫu",
    publishedAt: "2026-10-28T14:15:00+07:00",
    image: null,
    imageAlt: "Minh họa học sinh tự học",
    content: [
      {
        type: "paragraph",
        text:
          "Tự học hiệu quả bắt đầu từ mục tiêu rõ ràng. Người học nên chia mục tiêu lớn thành những nhiệm vụ nhỏ, có thể hoàn thành và đánh giá được.",
      },
      {
        type: "heading",
        text: "Xây dựng kế hoạch phù hợp",
      },
      {
        type: "paragraph",
        text:
          "Một kế hoạch tốt cần dành thời gian cho việc học mới, luyện tập và ôn tập. Hãy thường xuyên xem lại tiến độ để điều chỉnh phương pháp khi cần.",
      },
    ],
    relatedSlugs: ["doi-moi-phuong-phap-hoc-tap"],
    popular: true,
  },
  {
    id: 3,
    slug: "ung-dung-cong-nghe-trong-lop-hoc",
    title: "Ứng dụng công nghệ trong lớp học theo hướng thiết thực",
    description:
      "Công nghệ phát huy hiệu quả khi giải quyết được nhu cầu cụ thể của giáo viên và học sinh.",
    category: "Công nghệ giáo dục",
    publishedAt: "2026-10-27T09:00:00+07:00",
    image: null,
    imageAlt: "Minh họa ứng dụng công nghệ trong giáo dục",
    content: [
      {
        type: "paragraph",
        text:
          "Các công cụ số có thể hỗ trợ trình bày kiến thức, tổ chức bài tập và tăng cơ hội tương tác. Nhà trường cần cân nhắc điều kiện thiết bị, khả năng tiếp cận và mục tiêu giảng dạy khi lựa chọn công cụ.",
      },
    ],
    relatedSlugs: ["doi-moi-phuong-phap-hoc-tap"],
    popular: false,
  },
];