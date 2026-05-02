const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

// Đường dẫn file Excel
const filePath = path.join(__dirname, '..', 'public', 'LKH VNGROUP TOURIST 2026.xlsx');
const wb = xlsx.readFile(filePath);
const sheetName = wb.SheetNames[0];

// Đọc dữ liệu thô từ sheet
const rawData = xlsx.utils.sheet_to_json(wb.Sheets[sheetName], { header: 1 });

const parsedDepartures = [];

let currentTourName = '';
let currentDuration = '';
let currentFlight = '';
let currentPrice = 0;

// Bỏ qua dòng tiêu đề (index 0)
for (let i = 1; i < rawData.length; i++) {
    const row = rawData[i];
    
    // Nếu mảng rỗng thì bỏ qua
    if (!row || row.length === 0) continue;

    // Cập nhật giá trị hiện tại nếu ô đó không null/undefined
    if (row[0]) currentTourName = String(row[0]).trim();
    if (row[1]) currentDuration = String(row[1]).trim();
    if (row[2]) currentFlight = String(row[2]).trim();
    if (row[4] !== undefined && row[4] !== null) currentPrice = Number(row[4]);

    const dateString = row[3];
    if (!dateString) continue;

    const dateStr = String(dateString).trim();
    
    // Pattern: "Tháng 04: 25, 26, 27 (Lễ)"
    // Hoặc "Tháng 07: 03 "
    const monthMatch = dateStr.match(/Tháng\s*(\d+)\s*:/i);
    
    if (monthMatch) {
        const month = parseInt(monthMatch[1], 10);
        
        // Tách phần đằng sau dấu ":"
        const afterColon = dateStr.split(':')[1];
        
        // Bắt các con số (ngày)
        // Lưu ý: Đôi khi có chữ (Lễ)
        const isHoliday = afterColon.includes('(Lễ)');
        
        const days = afterColon.match(/\d+/g);
        
        if (days && days.length > 0) {
            days.forEach(dayStr => {
                const day = parseInt(dayStr, 10);
                
                // Tạo ngày (Năm 2026 theo tên file)
                const dateObj = new Date(2026, month - 1, day, 0, 0, 0);
                
                parsedDepartures.push({
                    id: `dep_${parsedDepartures.length + 1}`,
                    tourName: currentTourName,
                    duration: currentDuration,
                    flight: currentFlight,
                    price: currentPrice,
                    departureDate: dateObj.toISOString(),
                    isHoliday: isHoliday,
                    month: month - 1, // 0-indexed for filtering
                    day: day
                });
            });
        }
    } else {
        // Trường hợp format khác (nếu có)
        console.log("Không parse được ngày:", dateStr);
    }
}

// Sắp xếp theo ngày khởi hành
parsedDepartures.sort((a, b) => new Date(a.departureDate).getTime() - new Date(b.departureDate).getTime());

const outputDir = path.join(__dirname, '..', 'src', 'data');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const outputPath = path.join(outputDir, 'schedule.json');
fs.writeFileSync(outputPath, JSON.stringify(parsedDepartures, null, 2), 'utf-8');

console.log(`Đã xuất thành công ${parsedDepartures.length} lịch khởi hành ra file: ${outputPath}`);
