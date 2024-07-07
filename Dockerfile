# שלב 1: שלב הבנייה
FROM node:20 AS builder

# הגדרת ספריית העבודה בתוך הקונטיינר
WORKDIR /app

# העתקת קבצי הפרויקט לתוך הקונטיינר
COPY package*.json ./
COPY tsconfig*.json ./
COPY src ./src

# התקנת התלויות ובניית הפרויקט
RUN npm install
RUN npm run build

# שלב 2: שלב הריצה
FROM node:20

# הגדרת ספריית העבודה בתוך הקונטיינר
WORKDIR /app

# העתקת התוצרים מהשלב הקודם
COPY --from=builder /app .

# חשיפת הפורט
EXPOSE 3000

# הפקודה שתופעל בעת הרצת הקונטיינר
CMD ["npm", "run", "start:prod"]
