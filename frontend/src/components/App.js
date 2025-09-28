import React from "react";
import { Heart, BookOpen, Trophy, Clock } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="bg-gray-900 min-h-screen text-white flex flex-col items-center py-8 px-4">
      {/* Header */}
      <header className="w-full max-w-md flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <div className="bg-blue-600 p-2 rounded-full">
          <Trophy className="w-6 h-6 text-white" />
        </div>
      </header>

      {/* Stats Cards */}
      <div className="w-full max-w-md grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-800 rounded-2xl p-4 flex flex-col justify-between">
          <h2 className="font-semibold mb-2">Debates Completed</h2>
          <p className="text-3xl font-bold">12</p>
        </div>
        <div className="bg-gray-800 rounded-2xl p-4 flex flex-col justify-between">
          <h2 className="font-semibold mb-2">Win Rate</h2>
          <p className="text-3xl font-bold text-green-400">67%</p>
        </div>
      </div>

      {/* Progress Section */}
      <div className="w-full max-w-md bg-gray-800 rounded-2xl p-4 mb-6">
        <h2 className="font-semibold mb-4">Skill Progress</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span>Logic</span>
              <span className="text-blue-400">75%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div className="bg-blue-500 h-3 rounded-full" style={{ width: "75%" }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span>Persuasion</span>
              <span className="text-purple-400">42%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div className="bg-purple-500 h-3 rounded-full" style={{ width: "42%" }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span>Speed</span>
              <span className="text-pink-400">58%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div className="bg-pink-500 h-3 rounded-full" style={{ width: "58%" }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Cards */}
      <div className="w-full max-w-md grid grid-cols-2 gap-4">
        <div className="bg-gray-800 rounded-2xl p-4 flex flex-col items-center">
          <Heart className="w-6 h-6 text-red-500 mb-2" />
          <p className="text-lg font-bold">5</p>
          <span className="text-sm text-gray-400">Logic Points</span>
        </div>
        <div className="bg-gray-800 rounded-2xl p-4 flex flex-col items-center">
          <Clock className="w-6 h-6 text-yellow-400 mb-2" />
          <p className="text-lg font-bold">3h 25m</p>
          <span className="text-sm text-gray-400">Time Debating</span>
        </div>
      </div>
    </div>
  );
}
