# Sử dụng image nhẹ của Node
FROM node:19-alpine

# Tạo thư mục làm việc trong container
WORKDIR /app

# Copy các file cấu hình và lock trước (tốt cho caching)
COPY package.json .
COPY package-lock.json .

# Cài đặt các package
RUN npm install

# Copy tất cả các file còn lại (trừ node_modules nhờ .dockerignore)
COPY . .

# Expose port 5050 (phải khớp với PORT trong .env)
EXPOSE 5050

# Lệnh chạy app
CMD ["npm", "start"]
