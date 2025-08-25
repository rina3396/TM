import React, { useState, useEffect, useCallback } from 'react';
import { Bell, Plus, Minus, BarChart3, Clock, Droplet, Target, Calendar, Download, Settings } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const WaterIntakeApp = () => {
  const [dailyGoal, setDailyGoal] = useState(2000); // ml
  const [currentIntake, setCurrentIntake] = useState(0);
  const [drinkAmount, setDrinkAmount] = useState(200);
  const [drinkRecords, setDrinkRecords] = useState([]);
  const [alarmInterval, setAlarmInterval] = useState(60); // minutes
  const [isAlarmEnabled, setIsAlarmEnabled] = useState(false);
  const [nextAlarmTime, setNextAlarmTime] = useState(null);
  const [weeklyData, setWeeklyData] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date().toDateString());
  const [isInstallable, setIsInstallable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [notificationPermission, setNotificationPermission] = useState('default');

  // 週間データの初期化
  useEffect(() => {
    const initWeeklyData = () => {
      const data = [];
      const today = new Date();
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        data.push({
          date: date.toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' }),
          intake: Math.floor(Math.random() * 1000) + 1500, // サンプルデータ
          goal: dailyGoal
        });
      }
      // 今日のデータを実際の摂取量に更新
      data[6].intake = currentIntake;
      setWeeklyData(data);
    };
    initWeeklyData();
  }, [dailyGoal, currentIntake]);

  // アラーム機能（iPhone対応の通知）
  useEffect(() => {
    let interval;
    if (isAlarmEnabled) {
      interval = setInterval(() => {
        const now = new Date();
        setNextAlarmTime(new Date(now.getTime() + alarmInterval * 60000));
        
        // iPhoneバナー通知の実装
        if ('Notification' in window && Notification.permission === 'granted') {
          const notification = new Notification('💧 水分補給の時間です', {
            body: `${drinkAmount}ml の水を飲んで健康を維持しましょう！`,
            icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMzIiIGZpbGw9IiMzYjgyZjYiLz4KPHN2ZyB4PSIxNiIgeT0iMTYiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiPgo8cGF0aCBkPSJtMTIgMTkgNy03LTcgN3oiLz4KPHBhdGggZD0ibTUgMTIgNy03LTcgN3oiLz4KPHBhdGggZD0ibTEyIDUgNyA3LTcgN3oiLz4KPC9zdmc+CjwvZz4KPC9zdmc+',
            badge: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMzIiIGZpbGw9IiMzYjgyZjYiLz4KPHN2ZyB4PSIxNiIgeT0iMTYiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiPgo8cGF0aCBkPSJtMTIgMTkgNy03LTcgN3oiLz4KPHBhdGggZD0ibTUgMTIgNy03LTcgN3oiLz4KPHBhdGggZD0ibTEyIDUgNyA3LTcgN3oiLz4KPC9zdmc+CjwvZz4KPC9zdmc+',
            tag: 'water-reminder',
            requireInteraction: true,
            silent: false,
            vibrate: [200, 100, 200],
            actions: [
              {
                action: 'drink',
                title: '飲んだ',
                icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkgMTFIMTVNOSAxNUgxNU0xMiAzVjIxTTMgMTJIMjEiIHN0cm9rZT0iIzNiODJmNiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPC9zdmc+'
              },
              {
                action: 'snooze',
                title: '後で',
                icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiIHN0cm9rZT0iIzZiNzI4MCIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxwYXRoIGQ9Ik0xMiA2VjEyTDE2IDE0IiBzdHJva2U9IiM2YjcyODAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+Cjwvc3ZnPg=='
              }
            ]
          });
          
          // 通知のクリックイベント
          notification.onclick = function(event) {
            event.preventDefault();
            window.focus();
            addWater();
            notification.close();
          };
          
          // 通知のアクションイベント（実際の環境では Service Worker で処理）
          if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then(registration => {
              // Service Worker でアクションを処理
              registration.addEventListener('notificationclick', function(event) {
                if (event.action === 'drink') {
                  addWater();
                }
                event.notification.close();
              });
            });
          }
          
          // 自動で10秒後に通知を閉じる
          setTimeout(() => {
            notification.close();
          }, 10000);
          
        } else {
          // フォールバック: 通知許可がない場合
          const fallbackNotification = confirm('💧 水分補給の時間です！\n\n' + drinkAmount + 'ml の水を飲みますか？');
          if (fallbackNotification) {
            addWater();
          }
        }
      }, alarmInterval * 60000);
    }
    return () => clearInterval(interval);
  }, [isAlarmEnabled, alarmInterval, drinkAmount]);

  // Chrome PWA インストール機能
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      setIsInstallable(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // Chrome通知許可とService Worker登録
  useEffect(() => {
    const initializeNotifications = async () => {
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        setNotificationPermission(permission);
      }

      // Service Worker 登録（実際の環境では別ファイルが必要）
      if ('serviceWorker' in navigator) {
        try {
          // 実際の環境では service-worker.js ファイルを作成
          const registration = await navigator.serviceWorker.register('/sw.js');
          console.log('Service Worker registered:', registration);
        } catch (error) {
          console.log('Service Worker registration failed:', error);
        }
      }
    };

    initializeNotifications();
  }, []);

  // PWA インストール機能
  const handleInstallApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const result = await deferredPrompt.userChoice;
      if (result.outcome === 'accepted') {
        setIsInstallable(false);
        setDeferredPrompt(null);
      }
    }
  };

  // 日付変更の監視
  useEffect(() => {
    const checkDateChange = () => {
      const today = new Date().toDateString();
      if (today !== currentDate) {
        // 新しい日になったらリセット
        setCurrentDate(today);
        setCurrentIntake(0);
        setDrinkRecords([]);
      }
    };
    
    const interval = setInterval(checkDateChange, 60000); // 1分ごとにチェック
    return () => clearInterval(interval);
  }, [currentDate]);

  const addWater = () => {
    const now = new Date();
    const newRecord = {
      id: Date.now(),
      amount: drinkAmount,
      time: now.toLocaleTimeString('ja-JP', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      timestamp: now
    };
    
    setDrinkRecords(prev => [...prev, newRecord]);
    setCurrentIntake(prev => prev + drinkAmount);
  };

  const removeRecord = (id) => {
    const record = drinkRecords.find(r => r.id === id);
    if (record) {
      setDrinkRecords(prev => prev.filter(r => r.id !== id));
      setCurrentIntake(prev => prev - record.amount);
    }
  };

  const getProgress = () => (currentIntake / dailyGoal) * 100;

  const getNextDrinkTime = () => {
    if (drinkRecords.length === 0) return '今すぐ';
    
    const lastDrink = drinkRecords[drinkRecords.length - 1];
    const nextTime = new Date(lastDrink.timestamp.getTime() + alarmInterval * 60000);
    const now = new Date();
    
    if (nextTime <= now) return '今すぐ';
    
    return nextTime.toLocaleTimeString('ja-JP', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getRemainingAmount = () => Math.max(0, dailyGoal - currentIntake);

  const toggleAlarm = () => {
    setIsAlarmEnabled(!isAlarmEnabled);
    if (!isAlarmEnabled) {
      const now = new Date();
      setNextAlarmTime(new Date(now.getTime() + alarmInterval * 60000));
    } else {
      setNextAlarmTime(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-cyan-50 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-2 flex items-center justify-center gap-2">
          <Droplet className="text-blue-500" />
          水分摂取量管理アプリ
        </h1>
        <p className="text-gray-600">健康的な水分補給をサポートします</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* 今日の摂取量 */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Target className="text-blue-500" />
              今日の摂取量
            </h2>
            <span className="text-2xl font-bold text-blue-600">
              {currentIntake}ml
            </span>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>進捗率</span>
              <span>{Math.round(getProgress())}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(getProgress(), 100)}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>目標: {dailyGoal}ml</span>
            <span>残り: {getRemainingAmount()}ml</span>
          </div>
        </div>

        {/* アラーム設定 */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Bell className="text-amber-500" />
            通知アラーム設定
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">通知アラーム</span>
              <button
                onClick={toggleAlarm}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isAlarmEnabled 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {isAlarmEnabled ? 'ON' : 'OFF'}
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-700">通知間隔</span>
              <select
                value={alarmInterval}
                onChange={(e) => setAlarmInterval(Number(e.target.value))}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={30}>30分</option>
                <option value={60}>1時間</option>
                <option value={90}>1時間30分</option>
                <option value={120}>2時間</option>
              </select>
            </div>
            
            {nextAlarmTime && (
              <div className="text-sm text-gray-600 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                次の通知: {nextAlarmTime.toLocaleTimeString('ja-JP', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            )}
            
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                📱 iPhoneでバナー通知を有効にするには：<br />
                1. 設定 → 通知 → Safari/Chrome<br />
                2. 「通知を許可」をオンにする<br />
                3. 「バナー」を選択する
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* 水分補給 */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Plus className="text-green-500" />
            水分補給
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">量</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDrinkAmount(Math.max(50, drinkAmount - 50))}
                  className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-16 text-center font-medium">{drinkAmount}ml</span>
                <button
                  onClick={() => setDrinkAmount(drinkAmount + 50)}
                  className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <button
              onClick={addWater}
              className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
            >
              <Droplet className="w-5 h-5" />
              水を飲む
            </button>
            
            <div className="text-sm text-gray-600 text-center">
              次の目安時間: {getNextDrinkTime()}
            </div>
          </div>
        </div>

        {/* 飲水記録 */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Clock className="text-purple-500" />
            今日の記録
          </h2>
          
          <div className="max-h-48 overflow-y-auto space-y-2">
            {drinkRecords.length === 0 ? (
              <p className="text-gray-500 text-center py-4">まだ記録がありません</p>
            ) : (
              drinkRecords.slice().reverse().map((record) => (
                <div key={record.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Droplet className="w-4 h-4 text-blue-500" />
                    <span className="font-medium">{record.amount}ml</span>
                    <span className="text-gray-500 text-sm">{record.time}</span>
                  </div>
                  <button
                    onClick={() => removeRecord(record.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 週間推移グラフ */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <BarChart3 className="text-indigo-500" />
          週間推移
        </h2>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  `${value}ml`, 
                  name === 'intake' ? '摂取量' : '目標'
                ]}
              />
              <Bar dataKey="intake" fill="#3b82f6" name="摂取量" />
              <Bar dataKey="goal" fill="#e5e7eb" name="目標" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 設定 */}
      <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">設定</h2>
        <div className="flex items-center justify-between">
          <span className="text-gray-700">1日の目標摂取量</span>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={dailyGoal}
              onChange={(e) => setDailyGoal(Number(e.target.value))}
              className="w-24 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
              min="500"
              max="5000"
              step="100"
            />
            <span className="text-gray-600">ml</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterIntakeApp;