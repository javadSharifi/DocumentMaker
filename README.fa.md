<div dir="rtl">

# DocumentMaker · ویرایشگر بصری سند و فرم PDF

> **یک بار بساز. برای همیشه پر کن.** ابزاری متن‌باز و مبتنی بر مرورگر برای ساخت قالب‌های سند و خروجی گرفتن PDF دقیق — بدون سرور، بدون ابر، بدون ارسال هیچ داده‌ای.

[![دمو زنده](https://img.shields.io/badge/🚀_دمو_زنده-documentmaker.netlify.app-4f46e5?style=for-the-badge)](https://documentmaker.netlify.app/)
[![مجوز: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![English README](https://img.shields.io/badge/README-English-blue?style=for-the-badge)](README.md)

---

## DocumentMaker چیست؟

**DocumentMaker** یک اپلیکیشن تک‌صفحه‌ای (SPA) متن‌باز و **محلی‌محور** است که به شما امکان می‌دهد هر تصویر سندی را آپلود کنید، با یک بوم کشی-و-رها (Drag & Drop) روی آن ناحیه‌های ورودی تعریف کنید، و یک فرم پویا بسازید که خروجی آن یک PDF باکیفیت با داده‌های شما روی سند اصلی است.

مناسب برای: **فرم‌های اداری، فاکتورها، قراردادها، گواهی‌نامه‌ها** و هر سندی که به‌صورت تکراری پر می‌کنید.

---

## امکانات اصلی

| امکان                         | توضیح                                                    |
| ----------------------------- | -------------------------------------------------------- |
| 🖼️ **ویرایشگر قالب بصری**     | تعریف ناحیه‌های ورودی روی سند با Fabric.js v6            |
| 📋 **تولید خودکار فرم**       | ناحیه‌ها → فیلدهای فرم، بدون هیچ تنظیمی                  |
| 📄 **خروجی PDF دقیق**         | رندر باکیفیت با `jsPDF` و `html2canvas`                  |
| 💾 **ذخیره‌سازی کاملاً محلی** | تمام داده‌ها در IndexedDB مرورگر — هیچ چیز آپلود نمی‌شود |
| 🌐 **پشتیبانی RTL / LTR**     | فارسی و انگلیسی با تغییر خودکار چیدمان                   |
| 🌙 **تم تاریک / روشن**        | هماهنگ با تنظیمات سیستم                                  |

---

## تضمین حریم خصوصی

> **اسناد شما هرگز مرورگرتان را ترک نمی‌کنند.**

تمام پردازش‌ها — رندر تصویر، داده‌های فرم، تولید PDF، و ذخیره قالب‌ها — کاملاً در سمت کلاینت انجام می‌شود. هیچ بک‌اند، آنالیتیک، یا اشتراک‌گذاری داده با شخص ثالثی وجود ندارد.

---

## تکنولوژی‌ها

| لایه        | تکنولوژی                                 |
| ----------- | ---------------------------------------- |
| فریم‌ورک    | React 19، TypeScript 5، Vite 7           |
| موتور بوم   | Fabric.js v6                             |
| مدیریت حالت | Zustand (UI) + TanStack Query (async)    |
| ذخیره‌سازی  | Dexie.js (IndexedDB)                     |
| استایل      | Tailwind CSS v4، Radix UI، Framer Motion |
| خروجی PDF   | jsPDF، html2canvas، file-saver           |
| مسیریابی    | React Router v7                          |

---

## معماری

پروژه از **معماری تمیز (Clean Architecture)** و **اصول SOLID** در چهار لایه مجزا پیروی می‌کند:

```
src/
├── presentation/        # کامپوننت‌های React، صفحات، لایوت‌ها (فقط UI)
├── application/         # هوک‌ها، Zustand store، React Query
├── core/                # منطق دامنه، اینترفیس‌های TypeScript، توابع خالص
└── infrastructure/      # تنظیمات دیتابیس و پیاده‌سازی Repository‌ها
```

---

## شروع سریع

**پیش‌نیازها:** Node.js نسخه ۲۰ به بالا، pnpm (اجباری)

```bash
# ۱. کلون کردن
git clone https://github.com/javadSharifi/DocumentMaker.git
cd DocumentMaker

# ۲. نصب وابستگی‌ها
pnpm install

# ۳. اجرای محیط توسعه
pnpm dev

# ۴. بیلد برای production
pnpm build
```

---

## مشارکت

از مشارکت استقبال می‌شود. لطفاً مرزهای معماری را رعایت کنید:

- هیچ منطق async/DB داخل Zustand store نباشد
- هیچ منطق کسب‌وکار داخل کامپوننت‌های presentation نباشد
- از "God Hook" یا "God Component" پرهیز شود

---

## مجوز

MIT © [javadSharifi](https://github.com/javadSharifi/DocumentMaker)

---

<p align="center">
  <a href="https://documentmaker.netlify.app/">دمو زنده</a> ·
  <a href="https://github.com/javadSharifi/DocumentMaker/issues">گزارش باگ</a> ·
  <a href="https://github.com/javadSharifi/DocumentMaker/issues">درخواست قابلیت</a> ·
  <a href="README.md">نسخه انگلیسی</a>
</p>

</div>
