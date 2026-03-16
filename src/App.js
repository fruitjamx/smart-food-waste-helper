import { useState, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: #f7f3ee;
    min-height: 100vh;
  }

  :root {
    --cream: #f7f3ee;
    --bark: #3d2c1e;
    --moss: #4a6741;
    --sage: #8aab7e;
    --clay: #c17f4a;
    --blush: #e8d5c0;
    --warn: #d4622a;
    --white: #fdfaf7;
    --shadow: rgba(61,44,30,0.12);
  }

  .app {
    max-width: 480px;
    margin: 0 auto;
    min-height: 100vh;
    background: var(--white);
    box-shadow: 0 0 60px var(--shadow);
    display: flex;
    flex-direction: column;
  }

  .header {
    background: var(--bark);
    padding: 28px 24px 20px;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .header-title {
    font-family: 'Fraunces', serif;
    font-size: 22px;
    color: var(--blush);
    letter-spacing: -0.3px;
  }

  .header-sub {
    font-size: 12px;
    color: var(--sage);
    margin-top: 2px;
    font-weight: 300;
    letter-spacing: 0.5px;
  }

  .tabs {
    display: flex;
    background: var(--bark);
    padding: 0 24px 16px;
    gap: 6px;
  }

  .tab {
    flex: 1;
    padding: 8px 4px;
    background: transparent;
    border: 1px solid rgba(138,171,126,0.3);
    border-radius: 20px;
    color: var(--sage);
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 0.3px;
  }

  .tab.active {
    background: var(--sage);
    border-color: var(--sage);
    color: var(--bark);
    font-weight: 600;
  }

  .content {
    flex: 1;
    padding: 20px 20px 100px;
    overflow-y: auto;
  }

  /* INVENTORY */
  .section-title {
    font-family: 'Fraunces', serif;
    font-size: 18px;
    color: var(--bark);
    margin-bottom: 16px;
    font-weight: 600;
  }

  .add-form {
    background: var(--cream);
    border-radius: 16px;
    padding: 16px;
    margin-bottom: 20px;
    border: 1px solid var(--blush);
  }

  .form-row {
    display: flex;
    gap: 8px;
    margin-bottom: 10px;
    flex-wrap: wrap;
  }

  .input {
    flex: 1;
    min-width: 120px;
    padding: 10px 14px;
    border: 1.5px solid var(--blush);
    border-radius: 10px;
    background: var(--white);
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    color: var(--bark);
    outline: none;
    transition: border-color 0.2s;
  }

  .input:focus { border-color: var(--sage); }
  .input::placeholder { color: #bbb; }

  .btn {
    padding: 10px 18px;
    border-radius: 10px;
    border: none;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-primary {
    background: var(--moss);
    color: white;
  }
  .btn-primary:hover { background: var(--bark); }

  .btn-warn {
    background: var(--warn);
    color: white;
    padding: 6px 12px;
    font-size: 12px;
    border-radius: 8px;
  }

  .btn-ghost {
    background: transparent;
    color: var(--bark);
    border: 1.5px solid var(--blush);
    font-size: 12px;
    padding: 6px 12px;
    border-radius: 8px;
  }
  .btn-ghost:hover { border-color: var(--clay); color: var(--clay); }

  .food-list { display: flex; flex-direction: column; gap: 10px; }

  .food-card {
    background: var(--white);
    border: 1.5px solid var(--blush);
    border-radius: 14px;
    padding: 14px 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    transition: box-shadow 0.2s;
    animation: slideIn 0.3s ease;
  }

  @keyframes slideIn {
    from { opacity: 0; transform: translateY(-8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .food-card:hover { box-shadow: 0 4px 16px var(--shadow); }

  .food-card.expiring { border-color: var(--clay); background: #fff8f3; }
  .food-card.expired { border-color: var(--warn); background: #fff3f0; }

  .food-emoji { font-size: 28px; flex-shrink: 0; }

  .food-info { flex: 1; min-width: 0; }

  .food-name {
    font-family: 'Fraunces', serif;
    font-size: 15px;
    color: var(--bark);
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .food-meta {
    font-size: 11px;
    color: #888;
    margin-top: 2px;
  }

  .expiry-badge {
    font-size: 11px;
    font-weight: 600;
    padding: 3px 8px;
    border-radius: 20px;
    flex-shrink: 0;
  }

  .badge-ok { background: #e8f5e4; color: var(--moss); }
  .badge-soon { background: #fdf0e6; color: var(--clay); }
  .badge-expired { background: #fde8e4; color: var(--warn); }

  .food-actions { display: flex; gap: 6px; flex-shrink: 0; }

  .delete-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
    opacity: 0.4;
    transition: opacity 0.2s;
    padding: 4px;
  }
  .delete-btn:hover { opacity: 1; }

  /* REMINDERS */
  .reminder-section { margin-bottom: 24px; }

  .reminder-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
  }

  .reminder-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .dot-red { background: var(--warn); }
  .dot-orange { background: var(--clay); }
  .dot-green { background: var(--sage); }

  .reminder-label {
    font-family: 'Fraunces', serif;
    font-size: 15px;
    color: var(--bark);
    font-weight: 600;
  }

  .reminder-count {
    margin-left: auto;
    font-size: 11px;
    font-weight: 600;
    background: var(--blush);
    color: var(--bark);
    padding: 2px 8px;
    border-radius: 10px;
  }

  .reminder-card {
    background: var(--cream);
    border-radius: 12px;
    padding: 12px 14px;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .reminder-card.urgent { background: #fff3f0; }
  .reminder-card.soon { background: #fff8f3; }

  .reminder-emoji { font-size: 22px; }

  .reminder-info { flex: 1; }

  .reminder-name {
    font-size: 13px;
    font-weight: 600;
    color: var(--bark);
  }

  .reminder-days {
    font-size: 11px;
    margin-top: 2px;
  }

  .days-red { color: var(--warn); }
  .days-orange { color: var(--clay); }

  .empty-state {
    text-align: center;
    padding: 40px 20px;
    color: #aaa;
  }

  .empty-icon { font-size: 48px; margin-bottom: 12px; }

  .empty-text {
    font-family: 'Fraunces', serif;
    font-size: 16px;
    color: var(--bark);
    opacity: 0.4;
  }

  .empty-sub {
    font-size: 12px;
    margin-top: 6px;
    color: #bbb;
  }

  /* SCAN */
  .scan-area {
    border: 2px dashed var(--blush);
    border-radius: 20px;
    padding: 40px 20px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s;
    background: var(--cream);
    margin-bottom: 20px;
  }

  .scan-area:hover {
    border-color: var(--sage);
    background: #f0f7ee;
  }

  .scan-icon { font-size: 48px; margin-bottom: 12px; }

  .scan-title {
    font-family: 'Fraunces', serif;
    font-size: 17px;
    color: var(--bark);
    margin-bottom: 6px;
  }

  .scan-sub { font-size: 12px; color: #999; }

  .scan-options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 24px;
  }

  .scan-option {
    background: var(--cream);
    border: 1.5px solid var(--blush);
    border-radius: 16px;
    padding: 20px 16px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s;
  }

  .scan-option:hover {
    border-color: var(--sage);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px var(--shadow);
  }

  .scan-option-icon { font-size: 32px; margin-bottom: 8px; }

  .scan-option-label {
    font-family: 'Fraunces', serif;
    font-size: 14px;
    color: var(--bark);
    font-weight: 600;
  }

  .scan-option-sub { font-size: 11px; color: #999; margin-top: 3px; }

  .scan-result {
    background: var(--cream);
    border-radius: 16px;
    padding: 16px;
    border: 1.5px solid var(--sage);
    animation: slideIn 0.3s ease;
  }

  .scan-result-title {
    font-family: 'Fraunces', serif;
    font-size: 14px;
    color: var(--moss);
    margin-bottom: 12px;
    font-weight: 600;
  }

  .scan-items { display: flex; flex-direction: column; gap: 8px; }

  .scan-item {
    display: flex;
    align-items: center;
    gap: 10px;
    background: var(--white);
    border-radius: 10px;
    padding: 10px 12px;
  }

  .scan-item-emoji { font-size: 20px; }

  .scan-item-name {
    flex: 1;
    font-size: 13px;
    font-weight: 500;
    color: var(--bark);
  }

  .scan-item-expiry {
    font-size: 11px;
    color: #999;
  }

  .scan-actions {
    display: flex;
    gap: 8px;
    margin-top: 14px;
  }

  /* Stats bar */
  .stats-bar {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }

  .stat-card {
    flex: 1;
    background: var(--cream);
    border-radius: 12px;
    padding: 12px 10px;
    text-align: center;
  }

  .stat-num {
    font-family: 'Fraunces', serif;
    font-size: 22px;
    color: var(--bark);
    font-weight: 700;
    line-height: 1;
  }

  .stat-label {
    font-size: 10px;
    color: #999;
    margin-top: 3px;
    letter-spacing: 0.3px;
    text-transform: uppercase;
  }

  .fab {
    position: fixed;
    bottom: 24px;
    right: calc(50% - 240px + 20px);
    background: var(--moss);
    color: white;
    border: none;
    border-radius: 50px;
    padding: 14px 24px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    box-shadow: 0 8px 24px rgba(74,103,65,0.4);
    transition: all 0.2s;
    z-index: 20;
  }

  .fab:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(74,103,65,0.5); }

  select.input { cursor: pointer; }
`;

const FOOD_EMOJIS = {
  milk: "🥛", bread: "🍞", egg: "🥚", eggs: "🥚", cheese: "🧀",
  apple: "🍎", banana: "🍌", tomato: "🍅", carrot: "🥕",
  chicken: "🍗", beef: "🥩", fish: "🐟", rice: "🍚",
  yogurt: "🥛", butter: "🧈", lettuce: "🥬", spinach: "🥬",
  orange: "🍊", lemon: "🍋", potato: "🥔", onion: "🧅",
  default: "🛒"
};

const getEmoji = (name) => {
  const lower = name.toLowerCase();
  for (const [key, emoji] of Object.entries(FOOD_EMOJIS)) {
    if (lower.includes(key)) return emoji;
  }
  return FOOD_EMOJIS.default;
};

const getDaysUntilExpiry = (expiryDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = new Date(expiryDate);
  return Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
};

const getExpiryStatus = (days) => {
  if (days < 0) return "expired";
  if (days <= 3) return "soon";
  return "ok";
};

const MOCK_SCAN_RESULTS = [
  { name: "Whole Milk", expiry: getFutureDate(5), qty: "1L" },
  { name: "Greek Yogurt", expiry: getFutureDate(8), qty: "500g" },
  { name: "Cheddar Cheese", expiry: getFutureDate(14), qty: "200g" },
];

function getFutureDate(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

const INITIAL_ITEMS = [
  { id: 1, name: "Whole Milk", expiry: getFutureDate(2), qty: "1L", category: "dairy" },
  { id: 2, name: "Sourdough Bread", expiry: getFutureDate(1), qty: "1 loaf", category: "bakery" },
  { id: 3, name: "Free Range Eggs", expiry: getFutureDate(10), qty: "12 pack", category: "dairy" },
  { id: 4, name: "Chicken Breast", expiry: getFutureDate(-1), qty: "500g", category: "meat" },
  { id: 5, name: "Baby Spinach", expiry: getFutureDate(4), qty: "150g", category: "produce" },
  { id: 6, name: "Greek Yogurt", expiry: getFutureDate(7), qty: "500g", category: "dairy" },
];

export default function App() {
  const [tab, setTab] = useState("inventory");
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [newName, setNewName] = useState("");
  const [newExpiry, setNewExpiry] = useState("");
  const [newQty, setNewQty] = useState("");
  const [newCategory, setNewCategory] = useState("other");
  const [scanning, setScanning] = useState(false);
  const [scanResults, setScanResults] = useState(null);
  const [nextId, setNextId] = useState(100);

  const addItem = () => {
    if (!newName || !newExpiry) return;
    setItems(prev => [...prev, {
      id: nextId,
      name: newName,
      expiry: newExpiry,
      qty: newQty || "1",
      category: newCategory
    }]);
    setNextId(n => n + 1);
    setNewName(""); setNewExpiry(""); setNewQty("");
  };

  const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id));

  const simulateScan = (type) => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScanResults(MOCK_SCAN_RESULTS);
    }, 1800);
  };

  const addScannedItems = () => {
    const newItems = scanResults.map((r, i) => ({
      id: nextId + i,
      name: r.name,
      expiry: r.expiry,
      qty: r.qty,
      category: "dairy"
    }));
    setItems(prev => [...prev, ...newItems]);
    setNextId(n => n + newItems.length);
    setScanResults(null);
  };

  const expiredItems = items.filter(i => getDaysUntilExpiry(i.expiry) < 0);
  const soonItems = items.filter(i => { const d = getDaysUntilExpiry(i.expiry); return d >= 0 && d <= 3; });
  const okItems = items.filter(i => getDaysUntilExpiry(i.expiry) > 3);

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="header">
          <div className="header-title">🌿 FreshKeep</div>
          <div className="header-sub">Smart Food Waste Helper</div>
        </div>

        <div className="tabs">
          {[
            { id: "inventory", label: "Pantry" },
            { id: "reminders", label: "Reminders" },
            { id: "scan", label: "Scan" }
          ].map(t => (
            <button key={t.id} className={`tab ${tab === t.id ? "active" : ""}`}
              onClick={() => setTab(t.id)}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="content">

          {/* INVENTORY TAB */}
          {tab === "inventory" && (
            <>
              <div className="stats-bar">
                <div className="stat-card">
                  <div className="stat-num">{items.length}</div>
                  <div className="stat-label">Items</div>
                </div>
                <div className="stat-card">
                  <div className="stat-num" style={{ color: "var(--warn)" }}>{expiredItems.length}</div>
                  <div className="stat-label">Expired</div>
                </div>
                <div className="stat-card">
                  <div className="stat-num" style={{ color: "var(--clay)" }}>{soonItems.length}</div>
                  <div className="stat-label">Expiring Soon</div>
                </div>
              </div>

              <div className="add-form">
                <div className="form-row">
                  <input className="input" placeholder="Food item name"
                    value={newName} onChange={e => setNewName(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && addItem()} />
                  <input className="input" placeholder="Qty" style={{ maxWidth: 80 }}
                    value={newQty} onChange={e => setNewQty(e.target.value)} />
                </div>
                <div className="form-row">
                  <input className="input" type="date" value={newExpiry}
                    onChange={e => setNewExpiry(e.target.value)} />
                  <select className="input" value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}>
                    <option value="dairy">Dairy</option>
                    <option value="produce">Produce</option>
                    <option value="meat">Meat</option>
                    <option value="bakery">Bakery</option>
                    <option value="other">Other</option>
                  </select>
                  <button className="btn btn-primary" onClick={addItem}>Add</button>
                </div>
              </div>

              {items.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">🧺</div>
                  <div className="empty-text">Your pantry is empty</div>
                  <div className="empty-sub">Add items or scan a receipt to get started</div>
                </div>
              ) : (
                <div className="food-list">
                  {[...expiredItems, ...soonItems, ...okItems].map(item => {
                    const days = getDaysUntilExpiry(item.expiry);
                    const status = getExpiryStatus(days);
                    return (
                      <div key={item.id}
                        className={`food-card ${status === "soon" ? "expiring" : status === "expired" ? "expired" : ""}`}>
                        <div className="food-emoji">{getEmoji(item.name)}</div>
                        <div className="food-info">
                          <div className="food-name">{item.name}</div>
                          <div className="food-meta">{item.qty} · {item.category}</div>
                        </div>
                        <span className={`expiry-badge ${status === "ok" ? "badge-ok" : status === "soon" ? "badge-soon" : "badge-expired"}`}>
                          {days < 0 ? "Expired" : days === 0 ? "Today!" : `${days}d`}
                        </span>
                        <button className="delete-btn" onClick={() => removeItem(item.id)}>✕</button>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {/* REMINDERS TAB */}
          {tab === "reminders" && (
            <>
              <p className="section-title">Expiry Alerts</p>

              {expiredItems.length === 0 && soonItems.length === 0 && okItems.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">✅</div>
                  <div className="empty-text">All clear!</div>
                  <div className="empty-sub">No items expiring soon</div>
                </div>
              ) : (
                <>
                  {expiredItems.length > 0 && (
                    <div className="reminder-section">
                      <div className="reminder-header">
                        <div className="reminder-dot dot-red"></div>
                        <span className="reminder-label">Already Expired</span>
                        <span className="reminder-count">{expiredItems.length}</span>
                      </div>
                      {expiredItems.map(item => (
                        <div key={item.id} className="reminder-card urgent">
                          <div className="reminder-emoji">{getEmoji(item.name)}</div>
                          <div className="reminder-info">
                            <div className="reminder-name">{item.name}</div>
                            <div className={`reminder-days days-red`}>
                              Expired {Math.abs(getDaysUntilExpiry(item.expiry))} day(s) ago
                            </div>
                          </div>
                          <button className="btn btn-warn" onClick={() => removeItem(item.id)}>Discard</button>
                        </div>
                      ))}
                    </div>
                  )}

                  {soonItems.length > 0 && (
                    <div className="reminder-section">
                      <div className="reminder-header">
                        <div className="reminder-dot dot-orange"></div>
                        <span className="reminder-label">Expiring Within 3 Days</span>
                        <span className="reminder-count">{soonItems.length}</span>
                      </div>
                      {soonItems.map(item => {
                        const days = getDaysUntilExpiry(item.expiry);
                        return (
                          <div key={item.id} className="reminder-card soon">
                            <div className="reminder-emoji">{getEmoji(item.name)}</div>
                            <div className="reminder-info">
                              <div className="reminder-name">{item.name}</div>
                              <div className="reminder-days days-orange">
                                {days === 0 ? "Expires today!" : `Expires in ${days} day${days > 1 ? "s" : ""}`}
                              </div>
                            </div>
                            <button className="btn btn-ghost" onClick={() => removeItem(item.id)}>Used ✓</button>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {okItems.length > 0 && (
                    <div className="reminder-section">
                      <div className="reminder-header">
                        <div className="reminder-dot dot-green"></div>
                        <span className="reminder-label">Fresh & Good</span>
                        <span className="reminder-count">{okItems.length}</span>
                      </div>
                      {okItems.map(item => (
                        <div key={item.id} className="reminder-card">
                          <div className="reminder-emoji">{getEmoji(item.name)}</div>
                          <div className="reminder-info">
                            <div className="reminder-name">{item.name}</div>
                            <div className="reminder-days" style={{ color: "var(--sage)" }}>
                              Good for {getDaysUntilExpiry(item.expiry)} more days
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </>
          )}

          {/* SCAN TAB */}
          {tab === "scan" && (
            <>
              <p className="section-title">Scan & Add</p>

              {!scanResults && !scanning && (
                <>
                  <div className="scan-options">
                    <div className="scan-option" onClick={() => simulateScan("receipt")}>
                      <div className="scan-option-icon">🧾</div>
                      <div className="scan-option-label">Scan Receipt</div>
                      <div className="scan-option-sub">Auto-detect items & dates</div>
                    </div>
                    <div className="scan-option" onClick={() => simulateScan("photo")}>
                      <div className="scan-option-icon">📷</div>
                      <div className="scan-option-label">Photo Scan</div>
                      <div className="scan-option-sub">Identify food from photo</div>
                    </div>
                    <div className="scan-option" onClick={() => simulateScan("barcode")}>
                      <div className="scan-option-icon">📦</div>
                      <div className="scan-option-label">Barcode</div>
                      <div className="scan-option-sub">Scan product barcode</div>
                    </div>
                    <div className="scan-option" onClick={() => simulateScan("label")}>
                      <div className="scan-option-icon">🏷️</div>
                      <div className="scan-option-label">Read Label</div>
                      <div className="scan-option-sub">Extract expiry date</div>
                    </div>
                  </div>

                  <div className="scan-area" onClick={() => simulateScan("receipt")}>
                    <div className="scan-icon">📤</div>
                    <div className="scan-title">Upload an Image</div>
                    <div className="scan-sub">Tap to upload a receipt or food photo</div>
                  </div>
                </>
              )}

              {scanning && (
                <div className="scan-area" style={{ borderStyle: "solid", borderColor: "var(--sage)" }}>
                  <div className="scan-icon">🔍</div>
                  <div className="scan-title">Scanning...</div>
                  <div className="scan-sub">AI is reading your items and expiry dates</div>
                </div>
              )}

              {scanResults && (
                <div className="scan-result">
                  <div className="scan-result-title">✅ Found {scanResults.length} items</div>
                  <div className="scan-items">
                    {scanResults.map((r, i) => (
                      <div key={i} className="scan-item">
                        <div className="scan-item-emoji">{getEmoji(r.name)}</div>
                        <div className="scan-item-name">{r.name} <span style={{ color: "#bbb", fontWeight: 300 }}>· {r.qty}</span></div>
                        <div className="scan-item-expiry">Exp: {r.expiry}</div>
                      </div>
                    ))}
                  </div>
                  <div className="scan-actions">
                    <button className="btn btn-primary" style={{ flex: 1 }} onClick={addScannedItems}>
                      Add All to Pantry
                    </button>
                    <button className="btn btn-ghost" onClick={() => setScanResults(null)}>
                      Discard
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
