import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Zap, CheckCircle2, BarChart3, TrendingUp, Lightbulb, Lock as LockIcon } from "lucide-react";

interface UnlockIntentSignalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUnlock: (selectedOptions: string[]) => void;
  currentlyClickedBadgeId?: string;
}

export default function UnlockIntentSignalModal({
  open,
  onOpenChange,
  onUnlock,
  currentlyClickedBadgeId,
}: UnlockIntentSignalModalProps) {
  const handleUnlock = () => {
    onUnlock(["all"]);
    onOpenChange(false);
  };

  const premiumFeatures = [
    {
      icon: BarChart3,
      title: "Real-Time Intent Data",
      description: "Powered by Bombora"
    },
    {
      icon: TrendingUp,
      title: "Buying Signals",
      description: "Track company behavior"
    },
    {
      icon: Lightbulb,
      title: "AI-Powered Insights",
      description: "Deep intent analysis"
    },
    {
      icon: LockIcon,
      title: "Unlock All Signals",
      description: "Access complete database"
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl p-0 border-0 rounded-2xl overflow-hidden">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 z-50 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-white">
          {/* Left Column */}
          <div className="relative bg-gradient-to-br from-valasys-orange via-orange-500 to-red-500 p-8 sm:p-12 flex flex-col justify-between rounded-l-2xl overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full mb-6">
                <Zap className="w-4 h-4 text-white" />
                <span className="text-xs font-semibold text-white">PREMIUM FEATURE</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
                Unlock the <span className="block text-white/90">full power</span> of Intent Signals
              </h2>

              <p className="text-white/90 text-base leading-relaxed mb-8">
                Access real-time buying intent data powered by Bombora. Boost your productivity, discover high-intent prospects, and stay ahead of the competition. Experience premium insights today.
              </p>

              {/* Visual showcase */}
              <div className="relative mt-8 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 overflow-hidden group cursor-pointer hover:bg-white/15 transition-all">
                <div className="flex items-center justify-center aspect-video bg-gradient-to-br from-white/10 to-white/5 rounded-lg">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-3">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <p className="text-white/80 text-sm font-medium">See premium features</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="p-8 sm:p-12 flex flex-col justify-between rounded-r-2xl">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-8">
                Unlock premium features
              </h3>

              {/* Features List */}
              <div className="space-y-4 mb-10">
                {premiumFeatures.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div key={index} className="flex items-start gap-4 group">
                      <div className="flex-shrink-0 mt-1">
                        <CheckCircle2 className="w-5 h-5 text-valasys-orange" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm mb-1">
                          {feature.title}
                        </h4>
                        <p className="text-gray-600 text-xs">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Credit info */}
              <div className="bg-gradient-to-r from-orange-50 to-orange-100/50 border border-orange-200 rounded-lg p-4 mb-8">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-gray-900">Credits remaining:</span>
                  <br />
                  <span className="text-lg font-bold text-valasys-orange">48,256 credits</span>
                  <span className="text-gray-600"> • Each unlock uses 5 credits</span>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleUnlock}
                className="w-full h-12 bg-gradient-to-r from-valasys-orange to-orange-500 hover:from-orange-600 hover:to-orange-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                <Zap className="w-5 h-5 mr-2" />
                Unlock Premium Features
              </Button>
              <Button
                onClick={() => {
                  onOpenChange(false);
                  setSelectedOptions(new Set(["current"]));
                }}
                variant="outline"
                className="w-full h-12 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
              >
                See Pricing Plans
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
