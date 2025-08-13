import type { Question } from './types';

export const QUIZ_QUESTIONS: Question[] = [
  // Phần A: Hành vi sử dụng mạng
  {
    id: 'q1',
    section: 'Phần A: Hành vi sử dụng mạng',
    text: 'Bạn có từng bị thu hút bởi các tin nhắn tuyển dụng "việc nhẹ lương cao" và đã nhấn vào link để đăng ký hoặc tìm hiểu thêm không?',
    options: [
      { text: 'Chưa bao giờ, tôi luôn bỏ qua chúng.', score: 0 },
      { text: 'Thỉnh thoảng có tò mò nhấn vào xem thử.', score: 1 },
      { text: 'Đã từng đăng ký hoặc cung cấp thông tin cá nhân.', score: 2 },
    ],
  },
  {
    id: 'q2',
    section: 'Phần A: Hành vi sử dụng mạng',
    text: 'Bạn có thường xuyên kết bạn hoặc trò chuyện với những người lạ trên mạng xã hội có hồ sơ "quá hoàn hảo" (ảnh đẹp, lời lẽ ngọt ngào) không?',
    options: [
      { text: 'Không, tôi chỉ kết bạn với người quen.', score: 0 },
      { text: 'Có, nhưng tôi luôn giữ thái độ cảnh giác.', score: 1 },
      { text: 'Có, tôi khá cởi mở và tin người.', score: 2 },
    ],
  },
  {
    id: 'q7',
    section: 'Phần A: Hành vi sử dụng mạng',
    text: 'Bạn có thường xuyên tải và cài đặt ứng dụng từ các nguồn không chính thống (ngoài App Store hoặc Google Play) không?',
    options: [
      { text: 'Không, tôi chỉ tải từ cửa hàng ứng dụng chính thức.', score: 0 },
      { text: 'Hiếm khi, chỉ khi thực sự cần.', score: 1 },
      { text: 'Thường xuyên, tôi không thấy có vấn đề gì.', score: 2 },
    ],
  },
  {
    id: 'q8',
    section: 'Phần A: Hành vi sử dụng mạng',
    text: 'Bạn có công khai chia sẻ thông tin vị trí (check-in) hoặc lịch trình cá nhân của mình trên mạng xã hội không?',
    options: [
      { text: 'Không, tôi giữ kín thông tin này.', score: 0 },
      { text: 'Thỉnh thoảng, với bạn bè thân thiết.', score: 1 },
      { text: 'Có, tôi thường xuyên cập nhật cho mọi người biết.', score: 2 },
    ],
  },
  {
    id: 'q9',
    section: 'Phần A: Hành vi sử dụng mạng',
    text: 'Bạn có sử dụng các mạng Wi-Fi công cộng (quán cà phê, sân bay) để thực hiện các giao dịch nhạy cảm như chuyển khoản ngân hàng không?',
    options: [
      { text: 'Không bao giờ, tôi chỉ dùng 4G/5G hoặc mạng Wi-Fi tin cậy.', score: 0 },
      { text: 'Đôi khi, nếu không còn lựa chọn nào khác.', score: 1 },
      { text: 'Thường xuyên, tôi thấy nó tiện lợi.', score: 2 },
    ],
  },
  // Phần B: Nhận thức & Hiểu biết
  {
    id: 'q3',
    section: 'Phần B: Nhận thức & Hiểu biết',
    text: 'Bạn có nghĩ rằng việc chia sẻ mã OTP, mật khẩu, hoặc thông tin CCCD cho người khác (kể cả tự xưng là nhân viên ngân hàng, công an) là an toàn không?',
    options: [
      { text: 'Hoàn toàn không, đó là thông tin tuyệt mật.', score: 0 },
      { text: 'Tôi không chắc chắn lắm.', score: 1 },
      { text: 'An toàn nếu họ là người có thẩm quyền.', score: 2 },
    ],
  },
  {
    id: 'q4',
    section: 'Phần B: Nhận thức & Hiểu biết',
    text: 'Bạn có sử dụng chung một mật khẩu cho nhiều tài khoản quan trọng (email, ngân hàng, mạng xã hội) không?',
    options: [
      { text: 'Không, mỗi tài khoản một mật khẩu riêng và mạnh.', score: 0 },
      { text: 'Có, tôi dùng chung cho một vài tài khoản.', score: 1 },
      { text: 'Có, tôi dùng một mật khẩu cho tất cả mọi nơi.', score: 2 },
    ],
  },
  {
    id: 'q10',
    section: 'Phần B: Nhận thức & Hiểu biết',
    text: 'Theo bạn, "Tấn công giả mạo" (Phishing) là gì?',
    options: [
      { text: 'Là hình thức lừa đảo để lấy thông tin nhạy cảm (mật khẩu, thẻ tín dụng) qua các trang web/email giả mạo.', score: 0 },
      { text: 'Là một loại virus máy tính.', score: 1 },
      { text: 'Tôi không rõ về thuật ngữ này.', score: 2 },
    ],
  },
  {
    id: 'q11',
    section: 'Phần B: Nhận thức & Hiểu biết',
    text: 'Bạn có tin rằng cơ quan chức năng (Công an, Viện kiểm sát) sẽ làm việc và yêu cầu chuyển tiền qua điện thoại hoặc mạng xã hội không?',
    options: [
      { text: 'Không, họ luôn làm việc trực tiếp và có văn bản chính thức.', score: 0 },
      { text: 'Tôi không chắc, có thể trong trường hợp khẩn cấp.', score: 1 },
      { text: 'Có, tôi nghĩ đó là cách làm việc linh hoạt trong thời đại số.', score: 2 },
    ],
  },
  {
    id: 'q12',
    section: 'Phần B: Nhận thức & Hiểu biết',
    text: 'Bạn có kích hoạt tính năng "Xác thực hai yếu tố" (2FA) cho các tài khoản quan trọng của mình không?',
    options: [
      { text: 'Có, cho tất cả các tài khoản quan trọng.', score: 0 },
      { text: 'Chỉ cho một vài tài khoản.', score: 1 },
      { text: 'Không, tôi thấy nó phiền phức.', score: 2 },
    ],
  },
  // Phần C: Phản ứng tình huống
  {
    id: 'q5',
    section: 'Phần C: Phản ứng tình huống',
    text: 'Nếu có người tự xưng là Công an gọi điện, nói bạn liên quan đến một vụ án và yêu cầu bạn "bí mật hợp tác điều tra" bằng cách tự đến một nơi vắng vẻ hoặc khách sạn, bạn sẽ làm gì?',
    options: [
      { text: 'Ngắt máy, báo cho gia đình và gọi đến số điện thoại công khai của cơ quan công an để xác minh.', score: 0 },
      { text: 'Hoang mang, cân nhắc làm theo vì sợ hãi.', score: 1 },
      { text: 'Làm theo yêu cầu vì tin rằng đó là quy trình điều tra.', score: 2 },
    ],
  },
  {
    id: 'q6',
    section: 'Phần C: Phản ứng tình huống',
    text: 'Khi nhận được một thông báo (qua email, tin nhắn) rằng bạn đã vi phạm pháp luật và phải chuyển tiền để "giải quyết nhanh", phản ứng đầu tiên của bạn là gì?',
    options: [
      { text: 'Nhận định đây là lừa đảo, chặn và xóa tin nhắn.', score: 0 },
      { text: 'Lo lắng và tìm cách liên hệ lại với người gửi để hỏi rõ.', score: 1 },
      { text: 'Hoảng sợ và cân nhắc chuyển một khoản tiền nhỏ để "thoát tội".', score: 2 },
    ],
  },
  {
    id: 'q13',
    section: 'Phần C: Phản ứng tình huống',
    text: 'Một người bạn thân bất ngờ nhắn tin vay một khoản tiền lớn với lý do khẩn cấp và cung cấp một số tài khoản lạ. Bạn sẽ làm gì?',
    options: [
      { text: 'Gọi điện thoại trực tiếp cho bạn đó để xác nhận trước khi làm bất cứ điều gì.', score: 0 },
      { text: 'Nhắn tin hỏi lại vài câu để xác minh.', score: 1 },
      { text: 'Chuyển tiền ngay vì tin tưởng bạn bè.', score: 2 },
    ],
  },
  {
    id: 'q14',
    section: 'Phần C: Phản ứng tình huống',
    text: 'Bạn nhận được email/tin nhắn đe dọa, nói rằng họ có hình ảnh/thông tin nhạy cảm của bạn và yêu cầu tiền chuộc. Bạn sẽ?',
    options: [
      { text: 'Bình tĩnh, không trả lời, chặn kẻ đó và báo cho người thân/cơ quan chức năng.', score: 0 },
      { text: 'Hoảng sợ, trả lời tin nhắn để thương lượng.', score: 1 },
      { text: 'Tìm cách xoay tiền để trả cho họ vì quá sợ hãi.', score: 2 },
    ],
  },
  {
    id: 'q15',
    section: 'Phần C: Phản ứng tình huống',
    text: 'Bạn vô tình nhấn vào một đường link lạ và nhập mật khẩu tài khoản mạng xã hội của mình. Ngay sau đó bạn nhận ra đó là trang lừa đảo. Bạn sẽ làm gì ngay lập tức?',
    options: [
      { text: 'Đổi mật khẩu tài khoản đó ngay lập tức, bật xác thực 2 yếu tố và kiểm tra các hoạt động bất thường.', score: 0 },
      { text: 'Chờ xem có chuyện gì xảy ra không rồi mới tính.', score: 1 },
      { text: 'Không làm gì cả vì nghĩ rằng không có gì nghiêm trọng.', score: 2 },
    ],
  },
];
