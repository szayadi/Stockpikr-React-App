import React, { useEffect } from 'react';

interface TradingViewChartProps {
  symbol: string;
}

const TradingViewChart: React.FC<TradingViewChartProps> = ({ symbol }) => {
  useEffect(() => {
    const loadTradingViewLibrary = async () => {
      try {
        // Load TradingView library dynamically
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://s3.tradingview.com/tv.js';
        script.async = true;
        document.head.appendChild(script);
        await new Promise<void>((resolve, reject) => {
          script.onload = () => {
            resolve();
          };
          script.onerror = reject;
        });
      } catch (error) {
        throw new Error('Error loading TradingView library:' + error);
      }
    };

    const initializeWidget = async () => {
      try {
        // Ensure TradingView library is loaded
        await loadTradingViewLibrary();

        // Initialize TradingView widget
        new window.TradingView.widget({
          symbol: symbol,
          width: '100%',
          height: '800',
          locale: 'en',
          autosize: true,
          //theme: 'dark',
          toolbar_bg: '#f1f3f6',
          enable_publishing: false,
          allow_symbol_change: true,
          details: true,
          hotlist: true,
          calendar: true,
          studies: ['RSI@tv-basicstudies'],
          container_id: 'tv_chart_container',
          fullscreen: true,
          interval: '1D',
          container: 'tv_chart_container',
          disabled_features: [],
          enabled_features: []
        });
      } catch (error) {
        throw new Error('Error initializing TradingView chart:' + error);
      }
    };

    initializeWidget();
  }, [symbol]);

  return <div id="tv_chart_container" style={{ width: '100%', height: '800px' }}></div>;
};

export default TradingViewChart;
