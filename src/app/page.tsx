"use client";

import { useState, type FormEvent } from "react";

type MenuKey = "espresso" | "seasonal" | "bakery";

const menuGroups: Record<
  MenuKey,
  { eyebrow: string; title: string; description: string; items: { name: string; detail: string; price: string }[] }
> = {
  espresso: {
    eyebrow: "Daily classics",
    title: "The espresso bar",
    description: "Intentionally simple, beautifully dialed in. Available hot or iced.",
    items: [
      { name: "Field Notes Latte", detail: "house espresso · brown sugar · oat milk", price: "$6" },
      { name: "The Daily Drip", detail: "rotating single-origin filter", price: "$4" },
      { name: "Cortado", detail: "double espresso · silky whole milk", price: "$4.5" },
      { name: "Mocha for Good", detail: "70% chocolate · orange zest", price: "$6.5" },
    ],
  },
  seasonal: {
    eyebrow: "A little unexpected",
    title: "Spring favourites",
    description: "Small-batch flavors made for slow mornings and sunny walks.",
    items: [
      { name: "Honey Sea Salt Latte", detail: "wildflower honey · flaky sea salt", price: "$6.5" },
      { name: "Orange Cardamom Tonic", detail: "espresso · citrus · sparkling water", price: "$5.5" },
      { name: "Strawberry Matcha", detail: "ceremonial matcha · house strawberry milk", price: "$6.5" },
      { name: "Affogato", detail: "vanilla bean gelato · double espresso", price: "$7" },
    ],
  },
  bakery: {
    eyebrow: "Made each morning",
    title: "From the oven",
    description: "Baked in small batches right here so the good stuff never sits still.",
    items: [
      { name: "Almond Croissant", detail: "frangipane · toasted almonds", price: "$5.5" },
      { name: "Miso Chocolate Chip Cookie", detail: "brown butter · dark chocolate", price: "$4" },
      { name: "Morning Bun", detail: "citrus sugar · cardamom", price: "$4.5" },
      { name: "Tomato Danish", detail: "goat cheese · basil", price: "$6" },
    ],
  },
};

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg aria-hidden="true" className={diagonal ? "icon diagonal" : "icon"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CoffeeMark() {
  return (
    <svg aria-hidden="true" className="coffee-mark" viewBox="0 0 42 42" fill="none">
      <path d="M20.8 6.2C10.5 12.2 8.7 24.5 17.4 34.9c3.4 1.1 7 .9 10.6-.5 8-10.2 6.1-22.2-7.2-28.2Z" fill="currentColor" />
      <path d="M13.2 29.1c4.2-6.4 8.5-11.3 15.3-17.8M18.4 33.9c1.4-7.7 2.2-13.9 2-21.6" stroke="#F4E9D5" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function StarRow() {
  return <div className="stars" aria-label="5 out of 5 stars">★★★★★</div>;
}

export default function HomePage() {
  const [activeMenu, setActiveMenu] = useState<MenuKey>("espresso");
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderError, setOrderError] = useState("");
  const activeGroup = menuGroups[activeMenu];

  const openOrder = () => {
    setOrderSubmitted(false);
    setOrderError("");
    setIsOrderOpen(true);
  };

  const submitOrder = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOrderError("");
    setIsSubmitting(true);
    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          item: form.get("item"),
          customerName: form.get("customerName"),
          pickupTime: form.get("pickupTime"),
        }),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || "We couldn’t place that order just now.");
      setOrderSubmitted(true);
    } catch (error) {
      setOrderError(error instanceof Error ? error.message : "We couldn’t place that order just now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <section className="hero" id="top">
        <nav className="nav shell" aria-label="Main navigation">
          <a href="#top" className="brand" aria-label="The Daily Bean home">
            <span>The Daily</span>
            <strong>BEAN</strong>
          </a>
          <div className="nav-links">
            <a href="#menu">Menu</a>
            <a href="#story">Our story</a>
            <a href="#visit">Visit us</a>
          </div>
          <button className="nav-order" onClick={openOrder}>Order ahead <span>↗</span></button>
        </nav>

        <div className="hero-content shell">
          <div className="hero-copy">
            <p className="eyebrow light"><span className="eyebrow-dot" /> EST. 2014 · BROOKLYN, NY</p>
            <h1>Craft coffee.<br /><em>Local vibes.</em><br />Your daily ritual.</h1>
            <p className="hero-description">Good coffee, warm pastries, and a little room to breathe. Your neighborhood table is always waiting.</p>
            <div className="hero-actions">
              <button className="button button-cream" onClick={openOrder}>Order now <Arrow /></button>
              <a className="text-link light-link" href="#menu">Explore the menu <span>↓</span></a>
            </div>
          </div>
          <div className="hero-bottom">
            <div className="hero-rating"><StarRow /><span>4.9 from 500+ neighbors</span></div>
            <a href="#story" className="scroll-note"><span className="mouse-icon" /> SCROLL TO WANDER</a>
          </div>
        </div>
        <div className="hero-curve" />
      </section>

      <section className="intro-section shell" id="story">
        <div className="intro-stamp">
          <div className="stamp-circle"><CoffeeMark /></div>
          <p>NOT JUST<br />A CUP OF<br />COFFEE</p>
        </div>
        <div className="intro-copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> OUR LITTLE CORNER</p>
          <h2>Rooted in the ritual<br />of <em>good mornings.</em></h2>
          <p className="body-copy">We believe a great coffee shop is more than a place to grab a drink. It&apos;s a pause, a familiar face, a tiny anchor in your day. So we sweat the details—from our farmers to your favorite corner table.</p>
          <a className="text-link" href="#team">Meet the people behind the counter <Arrow /></a>
        </div>
        <aside className="quote-card">
          <span className="quote-mark">“</span>
          <p>“There&apos;s a particular kind of magic in knowing your barista knows your name.”</p>
          <span className="quote-by">— MARA &amp; JON, FOUNDERS</span>
        </aside>
      </section>

      <section className="gallery-strip" aria-label="Coffee shop moments">
        <div className="gallery-photo photo-pastry" />
        <div className="gallery-text">
          <p>Every day<br />deserves a<br /><em>better coffee.</em></p>
        </div>
        <div className="gallery-photo photo-corner" />
      </section>

      <section className="menu-section shell" id="menu">
        <div className="section-header">
          <div>
            <p className="eyebrow"><span className="eyebrow-dot" /> ALWAYS IN SEASON</p>
            <h2>Made for your<br /><em>right now.</em></h2>
          </div>
          <p className="section-side-copy">From the first sip to the last crumb, every item is a small moment worth looking forward to.</p>
        </div>
        <div className="menu-experience">
          <div className="menu-tabs" role="tablist" aria-label="Menu categories">
            {(Object.keys(menuGroups) as MenuKey[]).map((key) => (
              <button key={key} onClick={() => setActiveMenu(key)} className={activeMenu === key ? "active" : ""} role="tab" aria-selected={activeMenu === key}>
                {key === "espresso" ? "Coffee & espresso" : key === "seasonal" ? "Seasonal sips" : "Pastries & bites"}
                <span>0{Object.keys(menuGroups).indexOf(key) + 1}</span>
              </button>
            ))}
            <div className="menu-note"><span className="tiny-sun">✦</span> VEGAN &amp; GF<br />OPTIONS DAILY</div>
          </div>
          <div className="menu-card" key={activeMenu}>
            <div className="menu-card-header">
              <div><p className="eyebrow">{activeGroup.eyebrow}</p><h3>{activeGroup.title}</h3></div>
              <span className="menu-swipe">{activeGroup.description}</span>
            </div>
            <div className="menu-list">
              {activeGroup.items.map((item, index) => (
                <div className="menu-item" key={item.name}>
                  <span className="item-no">0{index + 1}</span>
                  <div><h4>{item.name}</h4><p>{item.detail}</p></div>
                  <strong>{item.price}</strong>
                </div>
              ))}
            </div>
            <button className="button button-dark menu-order" onClick={openOrder}>Order from this menu <Arrow /></button>
          </div>
        </div>
      </section>

      <section className="feature-section">
        <div className="shell feature-inner">
          <div className="feature-visual">
            <div className="coffee-image" />
            <div className="feature-sticker">SMALL<br />BATCH<br />BIG ♥</div>
            <div className="feature-caption">MORNING, ALWAYS<br />BETTER HERE.</div>
          </div>
          <div className="feature-copy">
            <p className="eyebrow light"><span className="eyebrow-dot" /> COME AS YOU ARE</p>
            <h2>Room to do<br /><em>your thing.</em></h2>
            <p>Whether you&apos;re deep in a deadline, catching up with a friend, or just taking five with a cortado—we&apos;ve saved you a seat.</p>
            <div className="feature-points">
              <div><span>01</span><strong>Fast, free WiFi</strong><small>Good for your to-do list.</small></div>
              <div><span>02</span><strong>Plenty of plugs</strong><small>Stay a while, we mean it.</small></div>
              <div><span>03</span><strong>Big community table</strong><small>For teams, solo dates &amp; ideas.</small></div>
            </div>
            <a className="text-link cream-link" href="#visit">Find your favorite seat <Arrow /></a>
          </div>
        </div>
      </section>

      <section className="review-section shell">
        <div className="review-heading">
          <p className="eyebrow"><span className="eyebrow-dot" /> FROM THE NEIGHBORHOOD</p>
          <h2>Word on the <em>street.</em></h2>
          <div className="review-total"><StarRow /><strong>4.9</strong><span>AVERAGE RATING<br />ON GOOGLE</span></div>
        </div>
        <div className="review-grid">
          <article className="review-card accent-card">
            <span className="large-quote">“</span>
            <p>I stopped in once for the coffee and now I have a standing Friday date with their almond croissant. The kind of place that makes a city feel like a neighborhood.</p>
            <footer><div className="avatar avatar-one">JM</div><div><strong>JESS M.</strong><small>LOCAL, SINCE 2018</small></div></footer>
          </article>
          <article className="review-card">
            <div className="review-card-stars"><StarRow /><span>GOOGLE REVIEW</span></div>
            <p>Genuinely the best oat latte in Brooklyn. But it&apos;s the people that keep me coming back. Warm, quick, and they remember exactly how I like it.</p>
            <footer><div className="avatar avatar-two">AK</div><div><strong>ARI K.</strong><small>REGULAR, 3 YEARS</small></div></footer>
          </article>
        </div>
      </section>

      <section className="team-section" id="team">
        <div className="shell team-inner">
          <div className="team-copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> THE HUMANS BEHIND THE HUM</p>
            <h2>Good people.<br /><em>Great coffee.</em></h2>
            <p>We&apos;re a small crew with big coffee opinions and an even bigger soft spot for our neighbors.</p>
            <a href="#visit" className="text-link">Come say hi <Arrow /></a>
          </div>
          <div className="team-photo" />
          <div className="team-annotation"><span>✦</span> WE&apos;RE<br />PROBABLY<br />MAKING A<br />PLAYLIST</div>
        </div>
      </section>

      <section className="visit-section shell" id="visit">
        <div className="visit-head">
          <p className="eyebrow"><span className="eyebrow-dot" /> FIND YOUR WAY HERE</p>
          <h2>Come on <em>in.</em></h2>
        </div>
        <div className="visit-grid">
          <div className="visit-map"><div className="map-lines" /><div className="map-pin">✦</div><span>THE DAILY<br />BEAN</span></div>
          <div className="visit-details">
            <div><p className="detail-label">VISIT</p><h3>88 Bedford Ave.<br />Brooklyn, NY 11211</h3><a href="https://maps.google.com/?q=88+Bedford+Ave+Brooklyn+NY+11211" target="_blank" rel="noreferrer">Get directions <Arrow diagonal /></a></div>
            <div><p className="detail-label">HOURS</p><ul><li><span>Monday – Friday</span><strong>6 AM – 6 PM</strong></li><li><span>Saturday – Sunday</span><strong>7 AM – 5 PM</strong></li></ul></div>
          </div>
        </div>
      </section>

      <section className="faq-section shell" aria-labelledby="faq-title">
        <div className="faq-intro">
          <p className="eyebrow"><span className="eyebrow-dot" /> GOOD TO KNOW</p>
          <h2 id="faq-title">A few <em>little things.</em></h2>
          <p>Everything you need to know before dropping in for your new favorite cup.</p>
        </div>
        <div className="faq-list">
          <details open><summary>Do you have WiFi and outlets?<span>+</span></summary><p>Yes and yes. Our WiFi is free, our outlets are plentiful, and weekday mornings are especially great for deep work.</p></details>
          <details><summary>Can I order for a group?<span>+</span></summary><p>Absolutely. Send us a note at least 24 hours ahead and we&apos;ll make coffee, pastries, and the logistics feel easy.</p></details>
          <details><summary>Do you offer dairy-free options?<span>+</span></summary><p>We keep oat, almond, and soy milk on hand, along with a rotating selection of vegan and gluten-friendly baked goods.</p></details>
          <details><summary>Can I buy a gift card?<span>+</span></summary><p>Of course. Gift cards are available at the counter in any amount, with digital options coming soon.</p></details>
        </div>
      </section>

      <section className="closing-cta">
        <div className="closing-inner shell">
          <div className="closing-copy"><p className="eyebrow light"><span className="eyebrow-dot" /> YOUR TABLE IS READY</p><h2>Make today<br />a good one.</h2><button className="button button-cream" onClick={openOrder}>Order ahead <Arrow /></button></div>
          <div className="closing-art"><div className="sun-ray one" /><div className="sun-ray two" /><div className="sun-ray three" /><CoffeeMark /></div>
        </div>
      </section>

      <footer className="footer shell">
        <a href="#top" className="brand footer-brand"><span>The Daily</span><strong>BEAN</strong></a>
        <p>Made with care in Brooklyn.<br />© 2024 The Daily Bean.</p>
        <div className="footer-links"><a href="#menu">Menu</a><a href="#visit">Visit</a><a href="mailto:hello@thedailybean.com">Say hello</a><a href="#top">Instagram ↗</a></div>
      </footer>

      {isOrderOpen && (
        <div className="order-overlay" role="dialog" aria-modal="true" aria-labelledby="order-title">
          <div className="order-modal">
            <button className="modal-close" onClick={() => setIsOrderOpen(false)} aria-label="Close order dialog">×</button>
            {orderSubmitted ? (
              <div className="order-success"><div className="success-mark">✓</div><p className="eyebrow">YOU&apos;RE ALL SET</p><h2>We&apos;ll have it ready.</h2><p>Thanks for choosing a little local goodness. We&apos;ll see you at the counter!</p><button className="button button-dark" onClick={() => setIsOrderOpen(false)}>Back to the shop</button></div>
            ) : (
              <form onSubmit={submitOrder}>
                <p className="eyebrow"><span className="eyebrow-dot" /> ORDER AHEAD</p>
                <h2 id="order-title">Your usual, coming up?</h2>
                <label>WHAT ARE YOU CRAVING?<select name="item" required defaultValue=""><option value="" disabled>Select a favorite</option><option>Field Notes Latte</option><option>Honey Sea Salt Latte</option><option>Almond Croissant</option><option>Drip Coffee</option></select></label>
                <label>NAME<input name="customerName" required placeholder="Your first name" /></label>
                <label>PICKUP TIME<select name="pickupTime" defaultValue="asap"><option value="asap">As soon as possible · 10–15 min</option><option value="30-minutes">In 30 minutes</option><option value="1-hour">In 1 hour</option></select></label>
                {orderError && <p className="order-error" role="alert">{orderError}</p>}
                <button className="button button-dark" type="submit" disabled={isSubmitting}>{isSubmitting ? "Placing your order..." : "Place pickup order"} <Arrow /></button>
                <small>We&apos;ll take payment when you pick up.</small>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
