/**
 * Ghép mô tả meta cho trang chi tiết tour.
 *
 * Trước đây mô tả lấy thẳng trường highlights rồi cắt 160 ký tự. Kết quả
 * còn nguyên dấu tick, số thứ tự, ký tự tab và xuống dòng, lại hay đứt
 * giữa chừng một từ:
 *
 *   "✔\tBAY THẲNG CHINA EASTERN AIRLINES\n✔\tCHƯƠNG TRÌNH ĐẶC BIỆT..."
 *   "1. Tham quan Vạn Lý Trường Thành \n2. Quảng trường Thiên An Môn\n...Thưở"
 *
 * Đây là dòng khách đọc trên Google để quyết định có bấm vào hay không,
 * nên nó cần là một câu hoàn chỉnh có số ngày, điểm đến và giá.
 */

const DAI_TOI_DA = 158;

/** Bỏ thẻ HTML, dấu tick, số thứ tự, xuống dòng và tab. */
function lamSachDiemNoiBat(raw?: string | null): string {
    if (!raw) return '';
    return raw
        .replace(/<[^>]+>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .split(/[\r\n]+/)
        .map((dong) =>
            dong
                .replace(/^[\s✔✓•·\-–—*+]+/, '')
                .replace(/^\d+\s*[.)]\s*/, '')
                .replace(/\s+/g, ' ')
                .trim()
        )
        .filter(Boolean)
        .join('. ');
}

/**
 * Nhiều tour nhập highlights bằng chữ in hoa toàn bộ. Đọc trên Google rất
 * chói nên chuyển về chữ thường rồi viết hoa chữ đầu.
 */
function boInHoaNeuCan(s: string): string {
    if (!s) return s;
    // Không dùng dải [A-ZÀ-Ý] vì nó bỏ sót chữ hoa tiếng Việt như Ẳ, Ư, Ơ, Ậ.
    // So từng ký tự với chính nó viết hoa: ký tự nào khác thì đó là chữ thường.
    let soChuCai = 0;
    let soChuThuong = 0;
    for (const c of s) {
        if (c.toLocaleUpperCase('vi-VN') === c.toLocaleLowerCase('vi-VN')) continue; // không phải chữ cái
        soChuCai++;
        if (c !== c.toLocaleUpperCase('vi-VN')) soChuThuong++;
    }
    if (!soChuCai || soChuThuong / soChuCai > 0.15) return s;

    // Viet hoa dau moi tu thay vi ha het xuong chu thuong. Noi dung tour day
    // ten rieng (China Eastern Airlines, Disneyland, Hong Kong); ha het xuong
    // thuong se thanh "china eastern airlines".
    return s
        .toLocaleLowerCase('vi-VN')
        .replace(/(^|[\s(“"'–—-])(\p{L})/gu, (_, truoc, chu) =>
            truoc + chu.toLocaleUpperCase('vi-VN')
        );
}

/**
 * Cắt cho vừa độ dài. Ưu tiên dừng ở hết câu để không đứt giữa một cụm
 * (ví dụ "chương trình đặc biệt no shopping" bị cắt thành "... no").
 * Không có chỗ ngắt câu hợp lý thì mới cắt ở ranh giới từ.
 */
function catTheoTu(s: string, toiDa: number): string {
    if (s.length <= toiDa) return s;
    const cat = s.slice(0, toiDa);

    const hetCau = cat.lastIndexOf('. ');
    if (hetCau > toiDa * 0.35) return cat.slice(0, hetCau);

    const khoangTrang = cat.lastIndexOf(' ');
    const ketQua = khoangTrang > toiDa * 0.55 ? cat.slice(0, khoangTrang) : cat;
    return ketQua.replace(/[\s,.;:–—-]+$/, '');
}

function dinhDangGia(gia?: number | string | null): string {
    const so = typeof gia === 'string' ? Number(gia.replace(/[^\d]/g, '')) : gia;
    if (!so || !Number.isFinite(so) || so <= 0) return '';
    return new Intl.NumberFormat('vi-VN').format(Math.round(so)) + 'đ';
}

export interface DuLieuMoTa {
    name?: string | null;
    duration?: number | string | null;
    destination?: string | null;
    hotelRating?: string | null;
    highlights?: string | null;
    price?: number | string | null;
}

export function moTaTour(tour: DuLieuMoTa): string {
    // Phần mở: điểm đến + số ngày + hạng khách sạn
    const mo: string[] = [];
    const diemDen = (tour.destination || '').trim();
    const soNgay = tour.duration ? String(tour.duration).replace(/[^\d]/g, '') : '';

    mo.push(diemDen ? `Tour ${diemDen}` : 'Tour du lịch');
    if (soNgay) mo.push(`${soNgay} ngày`);
    const hang = (tour.hotelRating || '').trim();
    if (hang) mo.push(`khách sạn ${hang}`);
    const phanMo = mo.join(' ').replace(' ngày khách sạn', ' ngày, khách sạn');

    // Phần đóng: giá và hotline
    const gia = dinhDangGia(tour.price);
    const phanDong = gia
        ? `Giá từ ${gia}. Hotline 0931 867 376.`
        : 'Liên hệ 0931 867 376 để nhận báo giá.';

    // Phần giữa: điểm nổi bật, lấp phần còn lại
    const conLai = DAI_TOI_DA - phanMo.length - phanDong.length - 4;
    let phanGiua = '';
    if (conLai > 24) {
        // Chuan hoa chu hoa SAU khi cat: nhieu tour co vai dong dau viet hoa
        // toan bo roi phan sau lai chu thuong. Xet ca chuoi thi ti le chu
        // thuong vuot nguong nen khong doi, trong khi doan thuc su duoc dung
        // lai toan chu hoa.
        const sach = lamSachDiemNoiBat(tour.highlights);
        phanGiua = boInHoaNeuCan(catTheoTu(sach, conLai));
    }

    const cac = [phanMo, phanGiua, phanDong].filter(Boolean);
    return cac
        .map((p, i) => (i < cac.length - 1 && !/[.!?]$/.test(p) ? p + '.' : p))
        .join(' ');
}
