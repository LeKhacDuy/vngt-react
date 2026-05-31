# Hướng Dẫn Deploy VNGT Web lên VPS (2 Core - 2GB RAM)

Cấu hình VPS 2 Core - 2GB RAM là **đủ để chạy tốt** website này. Tuy nhiên, Next.js khi `build` sẽ tốn khá nhiều RAM, nên cần tạo bộ nhớ ảo (Swap) để tránh bị lỗi.

## 1. Chuẩn bị môi trường (trên VPS)

### Cài đặt Node.js (phiên bản 20 LTS) và Git
```bash
# Cập nhật hệ thống
sudo apt update && sudo apt upgrade -y

# Cài curl và git
sudo apt install -y curl git

# Cài Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Kiểm tra version
node -v
npm -v
```

### Cài đặt PM2 (Quản lý tiến trình)
```bash
sudo npm install -g pm2
```

### Tạo bộ nhớ ảo (Swap) - QUAN TRỌNG
Vì VPS có 2GB RAM, khi chạy lệnh `build` có thể bị hết RAM. Hãy tạo thêm 2GB Swap:
```bash
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
# Lưu cấu hình swap để tự động kích hoạt khi khởi động lại VPS
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

## 2. Deploy Code

### Clone source code về VPS
```bash
# Thay thế URL bên dưới bằng repo của bạn
git clone https://github.com/LeKhacDuy/vngt-react.git
cd vngt-react
```

### Cài đặt dependencies
```bash
npm install
```

### Build ứng dụng
Đây là bước tốn RAM nhất. Nếu server quá yếu, bạn có thể build ở máy local rồi copy folder `.next` lên. Nhưng với Swap 2GB đã tạo ở trên, bạn có thể build trực tiếp:
```bash
npm run build
```

### Chạy ứng dụng với PM2
Sử dụng file cấu hình `ecosystem.config.js` đã chuẩn bị sẵn:
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## 3. Cập nhật code mới (Update)

Mỗi khi có code mới đẩy lên Git, bạn ssh vào VPS và chạy:
```bash
cd vngt-react
git pull origin main
npm install        # Nếu có package mới
npm run build      # Build lại code mới
pm2 restart vngt-web # Khởi động lại server
```

## 4. Kiểm tra logs (nếu có lỗi)
```bash
pm2 logs vngt-web
```
