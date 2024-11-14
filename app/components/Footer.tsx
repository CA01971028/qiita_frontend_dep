"use client";

import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"
// import { useState, useEffect } from "react";
// import { usePathname } from "next/navigation";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-blue-400 text-white py-6 mt-8">
      <div className="container mx-auto px-4">
        {/* 上部のリンクセクション */}
        <div className="flex justify-between items-center border-b border-gray-300 pb-4 mb-4">
          {/* 左側のロゴとコピーライト */}
          <div className="flex items-center">
            <div className="text-2xl bg-white w-20 h-10 rounded-full font-bold flex items-center justify-center text-blue-400">
              ITM
            </div>
            <p className="ml-4">&copy; 2024 ITM. All rights reserved.</p>
          </div>

          {/* 右側のリンク */}
          <div className="flex space-x-6">
            <Link href="/about" className="hover:underline">
              About Us
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>

        {/* 下部のソーシャルメディアリンク（仮のアイコン） */}
        <div className="flex justify-center space-x-6">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
            <FaXTwitter size={24} /> {/* Twitterアイコン */}
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
            <FaFacebook size={24} /> {/* Facebookアイコン */}
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
            <FaInstagram size={24} /> {/* Instagramアイコン */}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
