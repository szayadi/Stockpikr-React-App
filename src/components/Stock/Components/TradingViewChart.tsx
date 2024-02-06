import React, { useEffect } from 'react';

interface TradingViewChartProps {
  symbol: string;
}

const TradingViewChart: React.FC<TradingViewChartProps> = ({ symbol }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.type = 'text/javascript';
    script.async = true;
    script.onload = () => {
      new window.TradingView.widget({
        autosize: true,
        symbol: symbol || '',
        timezone: 'America/Vancouver',
        theme: 'dark',
        style: '1',
        locale: 'en',
        enable_publishing: false,
        withdateranges: true,
        range: 'YTD',
        hide_side_toolbar: false,
        allow_symbol_change: true,
        details: true,
        hotlist: true,
        calendar: true,
        show_popup_button: true,
        popup_width: '1000',
        popup_height: '650',
        container_id: 'tradingview_f71d8'
      });
    };
    document.body.appendChild(script);

    // Clean up
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="tradingview-widget-container" style={{ height: '1000px', width: '100%' }}>
      <div id="tradingview_f71d8" style={{ height: 'calc(100% - 32px)', width: '100%' }}></div>
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
};

export default TradingViewChart;
