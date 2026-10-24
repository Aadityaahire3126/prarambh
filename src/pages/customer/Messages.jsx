// src/pages/customer/Messages.jsx
import React, { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useAppData } from "../../context/AppDataContext";
import { useAuth } from "../../context/AuthContext";
import { MessageSquare, Send, Lock, ShieldCheck, User } from "lucide-react";

export const CustomerMessages = () => {
  const { data, sendMessage } = useAppData();
  const { user } = useAuth();

  const conversations = data.messages || [];
  const [activeConvId, setActiveConvId] = useState(conversations[0]?.id || "conv-1");
  const [inputText, setInputText] = useState("");

  const activeConv = conversations.find((c) => c.id === activeConvId) || conversations[0];

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(
      activeConv?.bookingId || "BK-701",
      user?.id || "c1",
      user?.name || "Rohit Mehta",
      inputText
    );
    setInputText("");
  };

  return (
    <DashboardLayout role="customer">
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            Protected On-Platform Communication
          </span>
          <h1 className="text-2xl font-extrabold text-stone-900 mt-0.5">
            Messages & Inquiries
          </h1>
        </div>

        {/* Protected Contact Notice */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-950 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Lock className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              <strong>Private Masked Messaging:</strong> Personal telephone numbers are never published. Coordinate instructions, timings, and arrival details here safely.
            </span>
          </div>
        </div>

        {/* Chat Interface Container */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[550px]">
          {/* Conversation List Sidebar */}
          <div className="md:col-span-4 border-r border-stone-200 p-4 space-y-2 bg-stone-50/50">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block px-2 mb-2">
              Conversations ({conversations.length})
            </span>

            {conversations.length === 0 ? (
              <p className="text-xs text-stone-400 p-4">No active conversations yet.</p>
            ) : (
              conversations.map((conv) => {
                const isSelected = conv.id === activeConv?.id;
                const lastMsg = conv.thread[conv.thread.length - 1];

                return (
                  <button
                    key={conv.id}
                    onClick={() => setActiveConvId(conv.id)}
                    className={`w-full text-left p-3 rounded-2xl border transition-all ${
                      isSelected
                        ? "bg-white border-emerald-500 shadow-xs"
                        : "bg-white/60 border-stone-200 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-stone-900 text-xs truncate max-w-[140px]">
                        {conv.workerName}
                      </span>
                      <span className="text-[10px] text-stone-400">{lastMsg?.timestamp}</span>
                    </div>
                    <div className="text-[11px] font-mono text-emerald-800 mb-1">{conv.bookingId}</div>
                    <p className="text-[11px] text-stone-500 truncate">{lastMsg?.text}</p>
                  </button>
                );
              })
            )}
          </div>

          {/* Active Chat Conversation Body */}
          <div className="md:col-span-8 flex flex-col justify-between p-6">
            {activeConv ? (
              <>
                {/* Header */}
                <div className="pb-3 border-b border-stone-100 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-stone-900 text-sm">{activeConv.workerName}</h3>
                    <p className="text-xs text-stone-500">
                      Linked to Booking: <strong className="font-mono text-emerald-800">{activeConv.bookingId}</strong>
                    </p>
                  </div>
                  <span className="text-[10px] bg-stone-100 text-stone-700 px-2 py-1 rounded-full font-medium">
                    Protected Channel
                  </span>
                </div>

                {/* Messages Feed */}
                <div className="flex-1 py-4 overflow-y-auto space-y-3 max-h-[380px]">
                  {activeConv.thread.map((msg) => {
                    const isMe = msg.senderId === (user?.id || "c1");

                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                      >
                        <div
                          className={`max-w-[75%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                            isMe
                              ? "bg-emerald-600 text-white rounded-br-none"
                              : "bg-stone-100 text-stone-800 rounded-bl-none"
                          }`}
                        >
                          <div className="font-bold text-[10px] opacity-75 mb-0.5">
                            {msg.senderName}
                          </div>
                          <div>{msg.text}</div>
                        </div>
                        <span className="text-[10px] text-stone-400 mt-1 px-1">
                          {msg.timestamp}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Message Input Box */}
                <form onSubmit={handleSend} className="pt-3 border-t border-stone-100 flex gap-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type a message (e.g. gate directions, arrival details)..."
                    className="flex-1 text-xs p-3 bg-stone-50 border border-stone-300 rounded-xl outline-hidden focus:bg-white focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    type="submit"
                    className="p-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl shadow-xs transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-24 text-stone-400 text-xs">
                Select a conversation to start chatting.
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomerMessages;
