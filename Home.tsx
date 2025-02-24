import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <motion.h1 
        className="text-3xl font-bold text-gray-900 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Vitaminium - дневник здоровья
      </motion.h1>
      
      <p className="text-gray-700 mb-6 text-center">Держи всё под контролем с Vitaminium!</p>
      
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6 space-y-4">
        <Button className="w-full bg-gradient-to-r from-[#05D243] to-gray-500 text-white py-3 rounded-xl text-lg">
          📅 Добавить приём витаминов
        </Button>
        <Button className="w-full bg-gradient-to-r from-[#05D243] to-gray-500 text-white py-3 rounded-xl text-lg">
          📊 АД, уровень сахара 
        </Button>
        <Button className="w-full bg-gradient-to-r from-[#05D243] to-gray-500 text-white py-3 rounded-xl text-lg">
          🩺 Самочувствие
        </Button>
        <Button className="w-full bg-gradient-to-r from-[#05D243] to-gray-500 text-white py-3 rounded-xl text-lg">
          🔔 Напоминания
        </Button>
        <Button className="w-full bg-gradient-to-r from-[#05D243] to-gray-500 text-white py-3 rounded-xl text-lg">
          📌 Женский календарь
        </Button>
        <Button className="w-full bg-gradient-to-r from-[#05D243] to-gray-500 text-white py-3 rounded-xl text-lg">
          🛒 Каталог
        </Button>
        <Button className="w-full bg-gradient-to-r from-[#05D243] to-gray-500 text-white py-3 rounded-xl text-lg">
          📢 Поделиться с друзьями
        </Button>
      </div>
    </div>
  );
}
