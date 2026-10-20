// SAZ WEARZ (@sazwearz) - Modern B2B Clothing Manufacturing Controller

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initCategoryExplorer();
  initProductDetailModal();
  initProductCustomizer();
  initMapPins();
  initBlogModal();
  initFaqAccordion();
  initQuoteForm();
  initFileUpload();
  initScrollSpy();
  initScrollReveal();
});

// 1. Mobile Menu Drawer
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeBtn = document.getElementById('mobile-menu-close');
  const menuLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !mobileMenu) return;

  const toggle = () => {
    mobileMenu.classList.toggle('hidden');
    document.body.classList.toggle('overflow-hidden');
  };

  toggleBtn.addEventListener('click', toggle);
  if (closeBtn) closeBtn.addEventListener('click', toggle);

  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    });
  });
}

// 2. Scroll-Triggered Entrance Animations
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(el => observer.observe(el));
}

// 3. Category & Sub-Category Explorer (NO PUBLIC PRICES)
const CATEGORY_DATA = {
  'street-wear': {
    title: 'Street Wear',
    desc: 'Heavyweight oversized silhouettes, vintage washes, and tactile embellishments built to your exact tech pack specifications.',
    items: [
      {
        name: 'Heavyweight Hoodies',
        tag: '450–500 GSM French Terry',
        gsm: '450–500 GSM 100% Combed Cotton French Terry',
        stitching: 'Twin-Needle Coverstitch, Bar-Tacked Stress Points',
        printStyles: '3D High-Density Puff, Screen Print, Vintage Distress',
        embroideryStyles: 'Chenille Lettering, 3D Puff Embroidery, Flat Tatami',
        overview: 'Oversized boxy streetwear silhouette, structured double-layer hood without drawstrings (or with custom dipped metal-tip drawstrings), deep kangaroo pocket, and heavy 2x2 ribbed cuffs and hem.',
        desc: 'Oversized boxy fit, structured double-layer hood, drop shoulders, heavy 2x2 ribbing, custom 3D puff prints (Front & Back Views).',
        image: 'assets/images/hoodie-heavyweight-front.jpg',
        backImage: 'assets/images/hoodie-heavyweight-back.jpg'
      },
      {
        name: 'Graphic Tees',
        tag: '240 GSM Mineral Wash',
        gsm: '240 GSM 100% Heavy Combed Ring-Spun Cotton',
        stitching: 'Tight 1.25" Ribbed Collar, Twin-Needle Hem & Sleeves',
        printStyles: 'Soft-Hand Discharge Screen Print, DTG, Plastisol',
        embroideryStyles: 'Tonal Micro Chest Embroidery, Hem Clip Labels',
        overview: 'Vintage acid/mineral washed streetwear boxy tees with thick non-sagging ribbed collar and drop-shoulder profile.',
        desc: 'Vintage acid/mineral washed boxy tees, thick 1.25" rib collar, soft-hand zero-feel discharge screen prints (Front & Back Views).',
        image: 'assets/images/graphic-tee-vintage-front.jpg',
        backImage: 'assets/images/graphic-tee-vintage-back.jpg'
      },
      {
        name: 'Cargo Pants',
        tag: 'Heavy Cotton Ripstop',
        gsm: '320 GSM 100% Cotton Tactical Ripstop',
        stitching: 'Reinforced Triple-Needle Inseams, Bar-Tacked Pockets',
        printStyles: 'Subtle Screen Print, Screen Printed Typography',
        embroideryStyles: 'Velcro Morale Patches, Direct Embroidery',
        overview: '6 functional 3D bellows utility pockets, articulated knee darting, adjustable ankle bungee toggles, and reinforced saddle seat.',
        desc: '6 functional 3D bellows pockets, articulated knee darting, adjustable ankle bungee toggles, reinforced saddle seat (Front & Back Views).',
        image: 'assets/images/cargo-pants-tactical-front.jpg',
        backImage: 'assets/images/cargo-pants-tactical-back.jpg'
      },
      {
        name: 'Bomber & Denim Jackets',
        tag: '14 oz Washed Denim & Outerwear',
        gsm: '14 oz Ring-Spun Denim / Heavyweight Flight Nylon Shell',
        stitching: 'Heavy Gold Contrast Stitching, Riveted Pockets',
        printStyles: 'Back-Panel Screen Print, DTG Direct-to-Garment',
        embroideryStyles: 'Large Back Chenille, Felt Appliqué, Woven Badges',
        overview: 'Classic vintage trucker cut with embossed metal shank buttons and waist tabs, alongside lined flight bombers with custom branded snap hardware.',
        desc: 'Classic vintage trucker cut with embossed metal shank buttons and waist tabs, alongside lined flight bombers with custom branded snap hardware (Front & Back Views).',
        image: 'assets/images/denim-jacket-vintage-front.jpg',
        backImage: 'assets/images/denim-jacket-vintage-back.jpg'
      },
      {
        name: 'Joggers',
        tag: '400–450 GSM Fleece',
        gsm: '420 GSM Brushed-Back Heavyweight Cotton Fleece',
        stitching: '4-Needle 6-Thread Flatlock, Reinforced Crotch Gusset',
        printStyles: 'Puff Print Leg Graphics, High-Density Screen Print',
        embroideryStyles: 'Direct Embroidery, Woven Hem Tags',
        overview: 'Deep slant pockets, heavy ribbed waistband with dipped metal-tip drawstrings, rear patch pocket, and elasticated ankle cuffs.',
        desc: 'Deep slant pockets, heavy ribbed waistband with dipped metal-tip drawstrings, rear patch pocket, and elasticated ankle cuffs (Front & Back Views).',
        image: 'assets/images/joggers-heavyweight-front.png',
        backImage: 'assets/images/joggers-heavyweight-back.png'
      },
      {
        name: 'Puffer Jackets',
        tag: 'Down-Insulated Ripstop',
        gsm: 'Waterproof DWR Micro-Ripstop + Synthetic Down Fill',
        stitching: 'Ultrasonic Welded Down Baffle Channels, Heavy YKK 2-Way Zips',
        printStyles: 'Reflective Screen Print, Heat-Transfer Branding',
        embroideryStyles: 'Silicone Rubber Badges, Embroidered Chest Logo',
        overview: 'Boxy streetwear winter puffer with waterproof micro-ripstop shell, horizontal down baffle channels, storm cuffs, toggle-cinch hood, and heavy two-way zipper.',
        desc: 'Boxy streetwear winter puffer with waterproof micro-ripstop shell, horizontal down baffle channels, storm cuffs, toggle-cinch hood, and heavy two-way zipper (Front & Back Views).',
        image: 'assets/images/puffer-jacket-black-front.png',
        backImage: 'assets/images/puffer-jacket-black-back.png'
      },
      {
        name: 'Tracksuits',
        tag: 'Heavy Tricot & Poly Blend',
        gsm: '320 GSM Heavy Poly-Tricot & Cotton Interlock',
        stitching: 'Coverstitched Contrast Piping Tape, Zippered Ankle Inseams',
        printStyles: 'Digital Sublimation, Screen Print Stripe Tape',
        embroideryStyles: 'Embroidered Chest Crests, Merrowed Patches',
        overview: 'Two-piece retro athletic track set with contrast piping tape, funnel neck zip jacket with chest badge, and pin-tucked track bottoms with zippered ankle hems.',
        desc: 'Two-piece retro athletic track set with contrast piping tape, funnel neck zip jacket with chest badge, and pin-tucked track bottoms with zippered ankle hems (Front & Back Views).',
        image: 'assets/images/tracksuit-retro-red-front.png',
        backImage: 'assets/images/tracksuit-retro-red-back.png'
      }
    ]
  },
  'gym-wear': {
    title: 'Gym Wear',
    desc: 'High-performance 4-way stretch, anti-chafing construction, and moisture management for bodybuilding and training labels.',
    items: [
      {
        name: 'Stringers & Tank Tops',
        tag: 'Raw-Edge Slub Cotton',
        gsm: '180–200 GSM Combed Slub Cotton / Cotton-Elastane',
        stitching: 'Raw-Edge Armholes, Double-Stitched Curved Hem',
        printStyles: 'Zero-Feel Water-Base Discharge, Soft Plastisol',
        embroideryStyles: 'Woven Lower Hem Label, Tonal Neck Stamp',
        overview: 'Deep athletic scoop neck, raw-edge armhole cutouts, Y-back racerback contour, drop-tail curved hem, and woven hem label.',
        desc: 'Deep athletic scoop neck, raw-edge armhole cutouts, Y-back racerback contour, drop-tail curved hem, and woven hem label (Front & Back Views).',
        image: 'assets/images/tank-top-stringer-front.png',
        backImage: 'assets/images/tank-top-stringer-back.png'
      },
      {
        name: 'Compression Tees',
        tag: '4-Way Stretch Lycra & Mesh',
        gsm: '220 GSM 85% Polyester / 15% Spandex Anti-Bacterial',
        stitching: '4-Needle 6-Thread Anti-Chafe Flatlock Seams',
        printStyles: 'Breathable Sublimation, Reflective Heat Transfer',
        embroideryStyles: 'Heat-Sealed Silicone Badges',
        overview: 'Ergonomic muscle-fit compression with flatlock 4-needle anti-chafe seams, underarm mesh ventilation zones, and raglan sleeve construction.',
        desc: 'Ergonomic muscle-fit compression with flatlock 4-needle anti-chafe seams, underarm mesh ventilation zones, and raglan sleeve construction (Front & Back Views).',
        image: 'assets/images/compression-tee-front.png',
        backImage: 'assets/images/compression-tee-back.png'
      },
      {
        name: 'Gym Shorts',
        tag: '4-Way Stretch Woven & Towel Loop',
        gsm: '180 GSM 4-Way Stretch Poly-Spandex with DWR',
        stitching: 'Reinforced Split-Hem Seams, Concealed Zip Pockets',
        printStyles: 'Reflective Screen Print, Sublimated Waistband',
        embroideryStyles: 'Subtle Woven Tab, Silicone Grip Print',
        overview: '5" & 7" inseam training shorts with concealed waterproof zipper pockets, rear stash pocket, dedicated towel/shirt carry loop, and side split mobility hems.',
        desc: '5" & 7" inseam training shorts with concealed waterproof zipper pockets, rear stash pocket, dedicated towel/shirt carry loop, and side split mobility hems (Front & Back Views).',
        image: 'assets/images/gym-shorts-front.png',
        backImage: 'assets/images/gym-shorts-back.png'
      },
      {
        name: 'Joggers & Tights',
        tag: 'Technical Poly-Span & Mesh',
        gsm: '280 GSM Interlock Technical Knit + Mesh Zones',
        stitching: 'Ergonomic Articulated Knee Darting, Flatlock Stitch',
        printStyles: 'Silicone High-Gloss Prints, Reflective Calves',
        embroideryStyles: 'Direct Micro Embroidery, Rubberized Badges',
        overview: 'Tapered athletic training joggers with articulated knee darts, ergonomic crotch gusset, waterproof zip pockets, and gusseted ankle zippers.',
        desc: 'Tapered athletic training joggers with articulated knee darts, ergonomic crotch gusset, waterproof zip pockets, and gusseted ankle zippers (Front & Back Views).',
        image: 'assets/images/gym-joggers-tights-front.png',
        backImage: 'assets/images/gym-joggers-tights-back.png'
      },
      {
        name: 'Oversized Pump Covers',
        tag: '260–280 GSM Combed Cotton',
        gsm: '280 GSM Heavy Ring-Spun Cotton',
        stitching: 'Reinforced 1.25" Rib Collar, Drop Shoulder Cut',
        printStyles: 'Distressed Vintage Screen, 3D High-Density Puff',
        embroideryStyles: 'Distressed Raw Appliqué, Woven Neck Tape',
        overview: 'Heavy-drop oversized boxy training tee with 1.25" thick ribbed collar, drop shoulders, vintage mineral wash, and distressed graphic print.',
        desc: 'Heavy-drop oversized boxy training tee with 1.25" thick ribbed collar, drop shoulders, vintage mineral wash, and distressed graphic print (Front & Back Views).',
        image: 'assets/images/pump-cover-tee-front.png',
        backImage: 'assets/images/pump-cover-tee-back.png'
      }
    ]
  },
  'leather-wear': {
    title: 'Leather Wear',
    desc: 'Mastercrafted in Sialkot using genuine full-grain hides, antique brass hardware, and tailored leather tailoring.',
    items: [
      {
        name: 'Biker & Racer Jackets',
        tag: '1.2–1.3mm Full-Grain Cowhide',
        gsm: '1.2–1.3mm Premium Full-Grain Cowhide / Buff Milled',
        stitching: 'Heavy Bonded Nylon Thread, Diamond Quilted Panels',
        printStyles: 'Laser Etched Leather, Stamped Branding',
        embroideryStyles: 'Direct Leather Embroidery, Quilted Leather Patches',
        overview: 'Handcrafted cafe racer jacket with channel-quilted shoulders and elbows, 4 zippered pockets, antique brass YKK hardware, and adjustable waist buckle tabs.',
        desc: 'Handcrafted cafe racer jacket with channel-quilted shoulders and elbows, 4 zippered pockets, antique brass YKK hardware, and adjustable waist buckle tabs (Front & Back Views).',
        image: 'assets/images/biker-racer-jacket-front.png',
        backImage: 'assets/images/biker-racer-jacket-back.png'
      },
      {
        name: 'Leather Pants',
        tag: '0.8–0.9mm Sheep Nappa',
        gsm: '0.8–0.9mm Supple Lambskin / Sheep Nappa',
        stitching: 'Tailored Knee Seams, Full Satin Interior Lining',
        printStyles: 'Blind Debossing on Waistband',
        embroideryStyles: 'Tonal Leather Appliqué',
        overview: 'Tailored straight-leg leather trousers with horizontal knee seams, slanted front pockets, rear spade pockets, and satin interior lining.',
        desc: 'Tailored straight-leg leather trousers with horizontal knee seams, slanted front pockets, rear spade pockets, and satin interior lining (Front & Back Views).',
        image: 'assets/images/leather-pants-skirts-front.png',
        backImage: 'assets/images/leather-pants-skirts-back.png'
      },
      {
        name: 'Leather Corsets',
        tag: 'Spiral Steel Boned & Busk Hooks',
        gsm: '1.0mm Selected Calf Nappa Leather',
        stitching: 'Spiral Steel Bone Encasements, Heavy Bar-Tacking',
        printStyles: 'Decorative Edge Foil Embossing',
        embroideryStyles: 'Embroidered Eyelet Backing, Ornate Leather Trim',
        overview: 'Handcrafted overbust leather corset in supple nappa leather with sweet-heart bust cups, 6 antique brass front busk clasps, 14-eyelet rear tight-lacing panel, and modesty flap.',
        desc: 'Handcrafted overbust leather corset in supple nappa leather with sweet-heart bust cups, 6 antique brass front busk clasps, 14-eyelet rear tight-lacing panel, and modesty flap (Front & Back Views).',
        image: 'assets/images/leather-corset-steel-front.png',
        backImage: 'assets/images/leather-corset-steel-back.png'
      },
      {
        name: 'Leather Skirts & Shorts',
        tag: 'High-Waist A-Line & Kick Vent',
        gsm: '0.8–1.0mm Milled Goat / Sheep Nappa',
        stitching: 'Hidden Hemming, Tailored Darting, YKK Metal Zips',
        printStyles: 'Laser Cut Patterns, Perforated Leather Detailing',
        embroideryStyles: 'Top-Stitched Leather Panels',
        overview: 'High-waisted A-line leather midi and mini skirts with walking kick vents and exposed YKK metal zips, alongside tailored leather shorts.',
        desc: 'High-waisted A-line leather midi and mini skirts with walking kick vents and exposed YKK metal zips, alongside tailored leather shorts (Front & Back Views).',
        image: 'assets/images/leather-pants-skirts-front.png',
        backImage: 'assets/images/leather-pants-skirts-back.png'
      },
      {
        name: 'Leather Vests',
        tag: '1.2–1.4mm Milled Cowhide',
        gsm: '1.2–1.4mm Heavy Duty Milled Cowhide',
        stitching: 'Heavy Bonded Nylon, Dual Concealed Carry Pockets',
        printStyles: 'Custom Stamped Liner, Leather Branding',
        embroideryStyles: 'Seamless Single-Piece Back for Rocker & Club Patches',
        overview: 'Club cut motorcycle vest with seamless single-piece back panel for rocker patches, hidden YKK zipper with snap flap, concealed carry pocket, and side lace adjusters.',
        desc: 'Club cut motorcycle vest with seamless single-piece back panel for rocker patches, hidden YKK zipper with snap flap, concealed carry pocket, and side lace adjusters (Front & Back Views).',
        image: 'assets/images/leather-vest-club-front.png',
        backImage: 'assets/images/leather-vest-club-back.png'
      },
      {
        name: 'Leather Boots',
        tag: '360° Goodyear Welted',
        gsm: 'Oiled Pull-Up Cowhide Shell + Full Calfskin Lining',
        stitching: '360° Goodyear Storm Welt, Triple-Stitched Cap Toe',
        printStyles: 'Debossed Leather Insole & Tongue Stamp',
        embroideryStyles: 'Heritage Pull Tab Stitching',
        overview: 'Heritage cap-toe service boots handcrafted from oiled pull-up cowhide with 360° storm welt, commando lug soles, brass speed hooks, and calfskin lining.',
        desc: 'Heritage cap-toe service boots handcrafted from oiled pull-up cowhide with 360° storm welt, commando lug soles, brass speed hooks, and calfskin lining (Side Profile & Rear Views).',
        image: 'assets/images/leather-boots-heritage-front.png',
        backImage: 'assets/images/leather-boots-heritage-back.png'
      },
      {
        name: 'Leather Accessories',
        tag: 'Full-Grain Hide & Hardware',
        gsm: 'Full-Grain Bridle & Buff Milled Leather',
        stitching: 'Saddle Stitching, Hand-Beveled Edge Painting',
        printStyles: 'Hot Foil Stamping, Blind Debossing',
        embroideryStyles: 'Monogrammed Leather Patches',
        overview: 'Handcrafted leather goods ensemble including oiled pull-up cowhide weekender duffle bag, double-stitched roller buckle belt, and carbon-knuckle riding gloves.',
        desc: 'Handcrafted leather goods ensemble including oiled pull-up cowhide weekender duffle bag, double-stitched roller buckle belt, and carbon-knuckle riding gloves (Front Zip & Rear Buckle Views).',
        image: 'assets/images/leather-accessories-set-front.png',
        backImage: 'assets/images/leather-accessories-set-back.png'
      }
    ]
  },
  'sports-wear': {
    title: 'Sports Wear',
    desc: 'All-over digital sublimation, micro-mesh breathability, and custom team kits built for professional competition.',
    items: [
      {
        name: 'Team Jerseys & Kits',
        tag: 'All-Over Sublimation & Poly Mesh',
        gsm: '160–180 GSM Interlock Polyester + Honeycomb Mesh',
        stitching: 'Overlocked Flat Seams, Raglan Sleeve Assembly',
        printStyles: 'All-Over Digital Sublimation (Fade-Proof CMYK+Fluo)',
        embroideryStyles: 'Woven Team Crests, Silicone Heat-Applied Badges',
        overview: 'Custom soccer, cricket, and basketball uniforms with moisture-wicking interlock, honeycomb mesh ventilation, and fade-proof digital dye infusion.',
        desc: 'Custom soccer, cricket, and basketball uniforms with moisture-wicking interlock, honeycomb mesh ventilation, and fade-proof digital dye infusion (Front & Back Views).',
        image: 'assets/images/sports-team-kits-front.png',
        backImage: 'assets/images/sports-team-kits-back.png'
      },
      {
        name: 'Tracksuits',
        tag: 'Heavy Tricot Warm-Up',
        gsm: '280–300 GSM Brushed Tricot / Poly Dobby',
        stitching: 'Twin-Needle Piping, Zippered Pockets & Ankle Zips',
        printStyles: 'Sublimated Side Panels, Screen Printed Logos',
        embroideryStyles: 'Direct Chest Embroidery, Embroidered Badge',
        overview: 'Two-piece retro athletic track set with contrast piping tape, funnel neck zip jacket with chest badge, and pin-tucked track bottoms with zippered ankle hems.',
        desc: 'Two-piece retro athletic track set with contrast piping tape, funnel neck zip jacket with chest badge, and pin-tucked track bottoms with zippered ankle hems (Front & Back Views).',
        image: 'assets/images/tracksuit-retro-red-front.png',
        backImage: 'assets/images/tracksuit-retro-red-back.png'
      },
      {
        name: 'Polo Shirts',
        tag: 'CoolDry Piqué & UV-Shield',
        gsm: '200–220 GSM Performance Poly/Cotton Piqué',
        stitching: '3-Button Placket, Back Shoulder Yoke, Tennis Split Hem',
        printStyles: 'Sublimated Collar & Placket, Screen Print',
        embroideryStyles: 'High-Definition Chest Embroidery',
        overview: 'Performance athletic polo with 3-button placket, underarm cooling mesh, back shoulder yoke, UV-shield finish, and tennis-tail side split hem.',
        desc: 'Performance athletic polo with 3-button placket, underarm cooling mesh, back shoulder yoke, UV-shield finish, and tennis-tail side split hem (Front & Back Views).',
        image: 'assets/images/polo-shirt-athletic-front.png',
        backImage: 'assets/images/polo-shirt-athletic-back.png'
      },
      {
        name: 'Sports Shorts',
        tag: '4-Way Stretch Poly & Flank Mesh',
        gsm: '140–160 GSM Featherlight Micro-Poly Stretch',
        stitching: 'Inner Thigh Gusset, Flatlock Seams, Hidden Zip Pockets',
        printStyles: 'Sublimated Flank Panels, Reflective Heat Seals',
        embroideryStyles: 'Direct Lower Leg Embroidery',
        overview: 'Ultra-light athletic shorts with charcoal flank mesh ventilation, inner thigh mobility gusset, concealed zip pockets, and rear zip stash pocket.',
        desc: 'Ultra-light athletic shorts with charcoal flank mesh ventilation, inner thigh mobility gusset, concealed zip pockets, and rear zip stash pocket (Front & Back Views).',
        image: 'assets/images/sports-shorts-athletic-front.png',
        backImage: 'assets/images/sports-shorts-athletic-back.png'
      },
      {
        name: 'Windbreakers',
        tag: 'DWR Ripstop & Cape Mesh',
        gsm: '75D Poly Ripstop with Water-Repellent DWR Finish',
        stitching: 'Taped Waterproof Seams, 3-Point Scuba Hood Bungee',
        printStyles: 'Reflective Screen Print, Weatherproof Chest Print',
        embroideryStyles: 'Rubberized Badges, Embroidered Storm Flap',
        overview: 'Technical two-tone running windbreaker with 3-point bungee scuba hood, rear cape ventilation flap, charcoal mesh lining, and 3 zipper pockets.',
        desc: 'Technical two-tone running windbreaker with 3-point bungee scuba hood, rear cape ventilation flap, charcoal mesh lining, and 3 zipper pockets (Front & Back Views).',
        image: 'assets/images/windbreaker-technical-front.png',
        backImage: 'assets/images/windbreaker-technical-back.png'
      },
      {
        name: 'Performance Socks & Headbands',
        tag: 'Silicone Grip & Terry Weave',
        gsm: '75% Combed Cotton / 20% Polyester / 5% Elastane',
        stitching: 'Seamless Hand-Linked Toe, Ribbed Arch Band',
        printStyles: 'Direct Silicone Traction Gripper Sole',
        embroideryStyles: 'Woven Jacquard Knit Patterns, Embroidered Terry Bands',
        overview: 'Anti-slip silicone grip athletic socks with arch compression, high-pile embroidered cotton terry wristbands, and stretch headbands.',
        desc: 'Anti-slip silicone grip athletic socks with arch compression, high-pile embroidered cotton terry wristbands, and stretch headbands (Grip Sole & Instep Mesh Views).',
        image: 'assets/images/sports-socks-headbands-front.png',
        backImage: 'assets/images/sports-socks-headbands-back.png'
      }
    ]
  },
  'active-wear': {
    title: 'Active Wear',
    desc: 'High-waisted compression, buttery-soft nylon/spandex blends, and sculpting silhouettes for active living.',
    items: [
      {
        name: 'Leggings & Yoga Pants',
        tag: 'Seamless Ribbed & Scrunch',
        gsm: '320 GSM 80% Micro-Nylon / 20% Spandex (Squat-Proof)',
        stitching: 'Seamless Circular Knit / Flatlock 4-Needle 6-Thread',
        printStyles: 'Silicone High-Gloss Print, Reflective Ankle Print',
        embroideryStyles: 'Woven Waistband Labels, Silicone Heat Seal',
        overview: 'Compressive double-ribbed high waistband, ruched butt-scrunch sculpting contour, outer leg rib panels, and 100% squat-proof non-sheer knit.',
        desc: 'Compressive double-ribbed high waistband, ruched butt-scrunch sculpting contour, outer leg rib panels, and 100% squat-proof non-sheer knit (Front & Back Views).',
        image: 'assets/images/leggings-seamless-terracotta-front.jpg',
        backImage: 'assets/images/leggings-seamless-terracotta-back.jpg'
      },
      {
        name: 'Sports Bras',
        tag: 'Racerback & Cross-Strap',
        gsm: '300 GSM Brushed Nylon-Spandex + Air-Mesh Lining',
        stitching: 'Anti-Roll Underbust Band, Removable Molded Cups',
        printStyles: 'Subtle Reflective Chest Logo, Matte Screen Print',
        embroideryStyles: 'Heat-Sealed Silicone Logos',
        overview: 'High-support racerback and criss-cross athletic bras with charcoal air-mesh ventilation panels, removable molded cups, and compressive anti-roll underbust band.',
        desc: 'High-support racerback and criss-cross athletic bras with charcoal air-mesh ventilation panels, removable molded cups, and compressive anti-roll underbust band (Front & Back Views).',
        image: 'assets/images/sports-bra-active-front.jpg',
        backImage: 'assets/images/sports-bra-active-back.jpg'
      },
      {
        name: 'Performance Tops',
        tag: 'Seamless Rib & Thumbholes',
        gsm: '240 GSM Circular Knit Nylon/Elastane',
        stitching: 'Engineered Micro-Vent Perforations, Raglan Sleeve Piping',
        printStyles: 'Subtle Minimalist Screen Print, Heat Seals',
        embroideryStyles: 'Tonal Micro Embroidery, Hem Clip',
        overview: 'Long-sleeve cropped athletic top with micro-perforated chest ventilation, contrast raglan piping, ribbed compression cuffs with thumbholes, and supportive underbust band.',
        desc: 'Long-sleeve cropped athletic top with micro-perforated chest ventilation, contrast raglan piping, ribbed compression cuffs with thumbholes, and supportive underbust band (Front & Detail Views).',
        image: 'assets/images/performance-top-active-front.jpg',
        backImage: 'assets/images/performance-top-active-back.jpg'
      },
      {
        name: 'Windbreakers',
        tag: 'DWR Ripstop & Cape Mesh',
        gsm: '75D Poly Ripstop with Water-Repellent DWR Finish',
        stitching: 'Taped Waterproof Seams, 3-Point Scuba Hood Bungee',
        printStyles: 'Reflective Screen Print, Weatherproof Chest Print',
        embroideryStyles: 'Rubberized Badges, Embroidered Storm Flap',
        overview: 'Technical two-tone running windbreaker with 3-point bungee scuba hood, rear cape ventilation flap, charcoal mesh lining, and 3 zipper pockets.',
        desc: 'Technical two-tone running windbreaker with 3-point bungee scuba hood, rear cape ventilation flap, charcoal mesh lining, and 3 zipper pockets (Front & Back Views).',
        image: 'assets/images/windbreaker-technical-front.png',
        backImage: 'assets/images/windbreaker-technical-back.png'
      },
      {
        name: 'Running Shorts & Skorts',
        tag: '2-in-1 Liner & Phone Pocket',
        gsm: 'Outer: 130 GSM Stretch Poly / Liner: 220 GSM Compressive Lycra',
        stitching: 'Flatlock Anti-Chafe Inseams, High-Split Hems',
        printStyles: 'Reflective Logos, Custom Sublimated Liner',
        embroideryStyles: 'Woven Waistband Patch',
        overview: 'High-split running shorts and wrap tennis skorts with built-in charcoal compression spandex liner, phone drop-in pocket, rear waistband zipper stash, and key loop.',
        desc: 'High-split running shorts and wrap tennis skorts with built-in charcoal compression spandex liner, phone drop-in pocket, rear waistband zipper stash, and key loop (Front & Back Views).',
        image: 'assets/images/running-shorts-skorts-active-front.jpg',
        backImage: 'assets/images/running-shorts-skorts-active-back.jpg'
      }
    ]
  },
  'headwear-gear': {
    title: 'Custom Headwear, Gloves & Bespoke Gear',
    desc: 'Structured headwear, tactical protective gloves, and comprehensive private-label OEM manufacturing.',
    items: [
      {
        name: 'Snapbacks',
        tag: '3D Puff & 5-Panel Campers',
        gsm: '380 GSM Acrylic Twill / Wool Blend',
        stitching: '6-Panel Structured Crown, 8-Row Stitched Visor, Buckram Backing',
        printStyles: 'Screen Printed Underbill, Sublimated Sweatband',
        embroideryStyles: 'High-Density 3D Puff Embroidery, Flat Side Embroidery',
        overview: 'Structured 6-panel flat-brim snapbacks with high-density 3D puff embroidery, vintage washed curved dad hats with brass buckle, and 5-panel campers with nylon clip straps.',
        desc: 'Structured 6-panel flat-brim snapbacks with high-density 3D puff embroidery, vintage washed curved dad hats with brass buckle, and 5-panel campers with nylon clip straps (Front & Profile Views).',
        image: 'assets/images/headwear-snapbacks-front.png',
        backImage: 'assets/images/headwear-snapbacks-back.png'
      },
      {
        name: 'Trucker Hats',
        tag: 'Foam & Honeycomb Mesh',
        gsm: 'High-Density Foam Front + Breathable Poly Mesh Rear',
        stitching: 'Structured 5-Panel Construction, 6-Row Stitched Curved Visor',
        printStyles: 'Sublimated Foam Front, Screen Printed Mesh',
        embroideryStyles: 'Merrowed Edge Woven Patches, Embroidered Borders',
        overview: 'Classic 5-panel foam-front trucker caps with breathable poly mesh rear, custom merrowed woven patches, 6-row stitched curved visors, and 7-snap closures.',
        desc: 'Classic 5-panel foam-front trucker caps with breathable poly mesh rear, custom merrowed woven patches, 6-row stitched curved visors, and 7-snap closures (Colorways & Patch Detail Views).',
        image: 'assets/images/headwear-trucker-front.png',
        backImage: 'assets/images/headwear-trucker-back.png'
      },
      {
        name: 'Tactical Beanies',
        tag: '7-Gauge Heavy Rib Knit',
        gsm: '100% Heavy Soft Acrylic / Merino Wool Blend',
        stitching: '7-Gauge 4-Dart Anatomical Crown Shaping, Double-Fold Cuff',
        printStyles: 'Subtle Screen Print on Fold-Over Label',
        embroideryStyles: 'Direct Flat & 3D Embroidery, Merrowed Clip Labels, Leather Badges',
        overview: 'Heavyweight acrylic & merino wool rib-knit beanies with 4-dart anatomical crown shaping, 3-inch fold-over cuff, and custom woven clip labels.',
        desc: 'Heavyweight acrylic & merino wool rib-knit beanies with 4-dart anatomical crown shaping, 3-inch fold-over cuff, and custom woven clip labels (Front Colorways & Rib Detail Views).',
        image: 'assets/images/headwear-beanies-front.png',
        backImage: 'assets/images/headwear-beanies-back.png'
      },
      {
        name: 'Gym Gloves',
        tag: 'Clarino® & 3D Air-Mesh',
        gsm: 'Heavy Duty Clarino® Synthetic Suede + 3D Airflow Mesh',
        stitching: 'Dual-Layer Palm Stitching, Integrated 2" Neoprene Wrist Wraps',
        printStyles: 'Silicone Chevron Traction Grip Matrix',
        embroideryStyles: 'Rubberized TPR Molded Wrist Straps, Woven Badges',
        overview: 'Fingerless tactical gym & lifting gloves with shock-absorbing gel-padded Clarino® palms, chevron silicone grip, 3D airflow mesh, quick-pull finger loops, and integrated 2-inch neoprene wrist wraps.',
        desc: 'Fingerless tactical gym & lifting gloves with shock-absorbing gel-padded Clarino® palms, chevron silicone grip, 3D airflow mesh, quick-pull finger loops, and integrated 2-inch neoprene wrist wraps (Fastened Profile & Extended Wrap Views).',
        image: 'assets/images/gym-gloves-front.png',
        backImage: 'assets/images/gym-gloves-back.png'
      },
      {
        name: 'Leather Biker Gloves',
        tag: 'Carbon Fiber Knuckle Armor',
        gsm: '1.0–1.1mm Full-Grain Goatskin & Aniline Cowhide',
        stitching: 'Kevlar® Heat-Resistant Thread, Accordion Flex Ribs',
        printStyles: 'Touchscreen Conductive Fingertip Imprints',
        embroideryStyles: 'Debossed Leather Pull Tabs, Molded Carbon Knuckle Shields',
        overview: 'Handcrafted full-grain goat & cowhide leather riding gloves with molded real carbon fiber knuckle guards, reinforced dual-layer palms, touchscreen fingertips, and accordion flex stretch ribs.',
        desc: 'Handcrafted full-grain goat & cowhide leather riding gloves with molded real carbon fiber knuckle guards, reinforced dual-layer palms, touchscreen fingertips, and accordion flex stretch ribs (Overhead Profile & 3/4 Isometric Views).',
        image: 'assets/images/leather-biker-gloves-front.png',
        backImage: 'assets/images/leather-biker-gloves-back.png'
      }
    ]
  }
};

function initCategoryExplorer() {
  const tabBtns = document.querySelectorAll('.category-tab-btn');
  const itemsContainer = document.getElementById('category-items-container');
  const catTitleEl = document.getElementById('current-category-title');
  const catDescEl = document.getElementById('current-category-desc');

  if (!tabBtns.length || !itemsContainer) return;

  function renderCategory(catKey) {
    const data = CATEGORY_DATA[catKey];
    if (!data) return;

    if (catTitleEl) catTitleEl.textContent = `${data.title} Collection`;
    if (catDescEl) catDescEl.textContent = data.desc;

    let cardsHtml = data.items.map((item, idx) => `
      <div 
        class="navy-card overflow-hidden group card-hover-glow flex flex-col justify-between cursor-pointer transition-all duration-300"
        onclick="openProductModal('${catKey}', ${idx})"
        tabindex="0"
        role="button"
        aria-label="Inspect ${escapeHtml(item.name)}"
      >
        <!-- Anti-Crop Product Image Frame (object-fit: contain; width: 100%; height: 280px; bg: #F8FAFC) -->
        <div class="relative p-3" style="background-color: #F8FAFC; border-top-left-radius: 1.25rem; border-top-right-radius: 1.25rem;">
          <img 
            id="card-img-${catKey}-${idx}" 
            src="${item.image}" 
            alt="${escapeHtml(item.name)}" 
            class="product-card-contain-img transition-transform duration-500 group-hover:scale-105" 
            style="object-fit: contain; width: 100%; height: 280px; background-color: #F8FAFC; border-radius: 8px; display: block;" 
          />
          <span class="absolute top-4 left-4 bg-blue-600 text-white font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-md z-10">
            Low MOQ: 30 Pcs
          </span>
          <span class="absolute top-4 right-4 bg-slate-900/90 text-sky-300 font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-white/10 z-10 shadow-sm">
            ${escapeHtml(item.tag)}
          </span>
          
          ${item.backImage ? `
            <div class="absolute bottom-4 right-4 flex items-center gap-1 z-20 bg-slate-900/90 backdrop-blur-md p-1 rounded-lg border border-white/10 shadow-lg" onclick="event.stopPropagation()">
              <button type="button" onclick="swapCardImage('card-img-${catKey}-${idx}', '${item.image}', this, event)" class="view-btn active-view px-2 py-0.5 rounded text-[10px] font-bold text-white bg-blue-600 transition-all">Front</button>
              <button type="button" onclick="swapCardImage('card-img-${catKey}-${idx}', '${item.backImage}', this, event)" class="view-btn px-2 py-0.5 rounded text-[10px] font-bold text-slate-300 hover:text-white transition-all">Back</button>
            </div>
          ` : ''}

          <div class="absolute bottom-4 left-4 bg-slate-900/85 backdrop-blur-sm text-sky-300 font-mono text-[10px] font-bold px-2.5 py-0.5 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
            Click to Inspect &rarr;
          </div>
        </div>

        <!-- Product Card Body -->
        <div class="p-6 space-y-4 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between gap-2">
              <h4 class="font-headline text-base sm:text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                ${escapeHtml(item.name)}
              </h4>
              <span class="text-xs text-sky-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">&nearr;</span>
            </div>
            <p class="text-xs text-slate-300 mt-2 leading-relaxed">
              ${escapeHtml(item.desc)}
            </p>
            <div class="mt-3 text-[11px] font-mono text-emerald-400 font-bold flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Factory Direct Customization &bull; Low MOQ</span>
            </div>
          </div>

          <!-- Quick Action Buttons -->
          <div class="pt-4 border-t border-white/5 grid grid-cols-2 gap-2" onclick="event.stopPropagation()">
            <button type="button" onclick="quickSelectForQuote('${escapeHtml(item.name)}', event)" class="btn-electric-blue py-2 text-xs font-bold text-center">
              Get a Quote
            </button>
            <button type="button" onclick="quickChatWhatsApp('${escapeHtml(item.name)}', event)" class="btn-whatsapp-green py-2 text-xs font-bold text-center flex items-center justify-center gap-1">
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // If headwear & gear tab is active, append the 6th Bespoke Concept Card
    if (catKey === 'headwear-gear') {
      cardsHtml += `
        <div class="navy-card p-8 border-2 border-dashed border-sky-400/40 flex flex-col justify-between items-center text-center space-y-6 hover:border-sky-400 transition-all bg-gradient-to-br from-[#151f33] to-[#0f172a]">
          <div class="w-16 h-16 rounded-2xl bg-blue-600/20 border border-sky-400/40 flex items-center justify-center text-sky-400 mx-auto shadow-inner">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"/></svg>
          </div>
          <div class="space-y-3">
            <span class="text-xs uppercase tracking-widest font-mono text-sky-400 font-bold">OEM / ODM Custom Lab</span>
            <h4 class="font-headline text-xl sm:text-2xl font-bold text-white leading-tight">
              Bespoke Concept: If you can design it, we manufacture it.
            </h4>
            <p class="text-xs sm:text-sm text-slate-300 leading-relaxed font-body">
              Have a proprietary silhouette, custom hardware, tactical harness, or specialized leather accessory not shown above? Send us your sketch, 3D render, or physical reference for turn-key pattern grading, prototyping, and export-grade production.
            </p>
          </div>
          <div class="w-full space-y-2 pt-2">
            <button type="button" onclick="quickSelectForQuote('Bespoke Concept Gear', event)" class="w-full btn-electric-blue py-3 text-xs font-bold text-center block shadow-lg">
              Submit Bespoke Tech Pack &rarr;
            </button>
            <button type="button" onclick="quickChatWhatsApp('Bespoke Concept Gear', event)" class="w-full btn-whatsapp-green py-2.5 text-xs font-bold text-center flex items-center justify-center gap-1 shadow-md">
              <span>Chat with Pattern Master</span>
            </button>
          </div>
        </div>
      `;
    }

    itemsContainer.innerHTML = cardsHtml;
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => {
        b.classList.remove('active', 'bg-blue-600', 'text-white', 'border-blue-500');
        b.classList.add('bg-slate-900', 'text-slate-300', 'border-white/10');
      });
      btn.classList.add('active', 'bg-blue-600', 'text-white', 'border-blue-500');
      btn.classList.remove('bg-slate-900', 'text-slate-300', 'border-white/10');

      const catKey = btn.getAttribute('data-cat');
      renderCategory(catKey);
    });
  });

  // Initial render (Street Wear)
  renderCategory('street-wear');
}

// 4. Interactive Product Detail Popup Modal Controllers
let currentModalItem = null;
let currentModalCatKey = null;

const MODAL_PRESET_COLORS = [
  { name: 'Midnight Navy', hex: '#0B1120' },
  { name: 'Electric Royal Blue', hex: '#2563EB' },
  { name: 'Jet Black', hex: '#111827' },
  { name: 'Cloud White', hex: '#FFFFFF' },
  { name: 'Heather Grey', hex: '#94A3B8' },
  { name: 'Tactical Olive', hex: '#3F4F44' },
  { name: 'Terracotta Rust', hex: '#C25E3B' },
  { name: 'Team Crimson', hex: '#B91C1C' }
];

function initProductDetailModal() {
  const modal = document.getElementById('product-detail-modal');
  if (!modal) return;

  // Backdrop click closes modal
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeProductModal();
    }
  });

  // Escape key closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeProductModal();
    }
  });
}

window.openProductModal = function(catKey, idx) {
  const catData = CATEGORY_DATA[catKey];
  if (!catData || !catData.items || !catData.items[idx]) return;

  const item = catData.items[idx];
  currentModalItem = item;
  currentModalCatKey = catKey;

  const modal = document.getElementById('product-detail-modal');
  if (!modal) return;

  // Category Breadcrumb
  const breadcrumbEl = document.getElementById('modal-breadcrumb-cat');
  if (breadcrumbEl) breadcrumbEl.textContent = catData.title;

  // Image & Tag Badge
  const imgEl = document.getElementById('modal-product-img');
  if (imgEl) {
    imgEl.src = item.image;
    imgEl.alt = item.name;
    imgEl.style.transform = 'scale(1)';
    imgEl.style.transformOrigin = 'center center';
  }

  const tagBadge = document.getElementById('modal-tag-badge');
  if (tagBadge) tagBadge.textContent = item.tag || 'Export Grade';

  // Details
  const titleEl = document.getElementById('modal-product-title');
  if (titleEl) titleEl.textContent = item.name;

  const descEl = document.getElementById('modal-product-desc');
  if (descEl) descEl.textContent = item.overview || item.desc;

  // Specs
  const gsmEl = document.getElementById('modal-spec-gsm');
  if (gsmEl) gsmEl.textContent = item.gsm || item.tag;

  const stitchingEl = document.getElementById('modal-spec-stitching');
  if (stitchingEl) stitchingEl.textContent = item.stitching || '4-Needle 6-Thread / Twin-Needle';

  const printEl = document.getElementById('modal-spec-print');
  if (printEl) printEl.textContent = item.printStyles || '3D Puff, Screen, DTG, Sublimation';

  const embroideryEl = document.getElementById('modal-spec-embroidery');
  if (embroideryEl) embroideryEl.textContent = item.embroideryStyles || 'Flat Tatami, 3D Puff, Chenille Patches';

  // Thumbnails row for Front/Back switcher
  const thumbRow = document.getElementById('modal-thumbnails-row');
  if (thumbRow) {
    if (item.backImage) {
      thumbRow.innerHTML = `
        <button 
          type="button" 
          onclick="switchModalView('${item.image}', this)" 
          class="modal-thumb-btn active-thumb px-3 py-1.5 rounded-lg border-2 border-sky-400 bg-slate-900 text-xs font-bold text-white flex items-center gap-1.5 transition-all shadow-sm"
        >
          <span class="w-2 h-2 rounded-full bg-blue-500"></span>
          <span>Front View</span>
        </button>
        <button 
          type="button" 
          onclick="switchModalView('${item.backImage}', this)" 
          class="modal-thumb-btn px-3 py-1.5 rounded-lg border border-white/10 bg-slate-900 text-xs font-bold text-slate-300 hover:text-white hover:border-sky-400 flex items-center gap-1.5 transition-all shadow-sm"
        >
          <span class="w-2 h-2 rounded-full bg-slate-500"></span>
          <span>Back View</span>
        </button>
      `;
    } else {
      thumbRow.innerHTML = '';
    }
  }

  // Color Swatches
  const swatchContainer = document.getElementById('modal-color-swatches');
  const pantoneInput = document.getElementById('modal-pantone-input');
  if (pantoneInput) pantoneInput.value = '';

  if (swatchContainer) {
    swatchContainer.innerHTML = MODAL_PRESET_COLORS.map((c, i) => `
      <button 
        type="button" 
        title="${c.name}" 
        onclick="selectModalSwatch('${c.name}', '${c.hex}', this)" 
        class="modal-color-pill w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 shadow-sm ${i === 0 ? 'border-sky-400 ring-2 ring-sky-400/40' : 'border-white/20'}" 
        style="background-color: ${c.hex};"
      ></button>
    `).join('');
  }

  modal.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
};

window.closeProductModal = function() {
  const modal = document.getElementById('product-detail-modal');
  if (modal) {
    modal.classList.add('hidden');
  }
  document.body.classList.remove('overflow-hidden');
  resetModalZoom();
};

window.switchModalView = function(imgSrc, btnEl) {
  const img = document.getElementById('modal-product-img');
  if (img) {
    img.src = imgSrc;
  }
  if (btnEl && btnEl.parentElement) {
    btnEl.parentElement.querySelectorAll('.modal-thumb-btn').forEach(btn => {
      btn.classList.remove('border-2', 'border-sky-400', 'text-white', 'active-thumb');
      btn.classList.add('border', 'border-white/10', 'text-slate-300');
    });
    btnEl.classList.remove('border', 'border-white/10', 'text-slate-300');
    btnEl.classList.add('border-2', 'border-sky-400', 'text-white', 'active-thumb');
  }
  resetModalZoom();
};

window.selectModalSwatch = function(colorName, colorHex, btnEl) {
  const pantoneInput = document.getElementById('modal-pantone-input');
  if (pantoneInput) {
    pantoneInput.value = `${colorName} (${colorHex})`;
  }
  if (btnEl && btnEl.parentElement) {
    btnEl.parentElement.querySelectorAll('.modal-color-pill').forEach(pill => {
      pill.classList.remove('border-sky-400', 'ring-2', 'ring-sky-400/40');
      pill.classList.add('border-white/20');
    });
    btnEl.classList.remove('border-white/20');
    btnEl.classList.add('border-sky-400', 'ring-2', 'ring-sky-400/40');
  }
};

window.handleModalZoom = function(e) {
  const wrapper = document.getElementById('modal-zoom-wrapper');
  const img = document.getElementById('modal-product-img');
  if (!wrapper || !img) return;

  const rect = wrapper.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;

  img.style.transformOrigin = `${x}% ${y}%`;
  img.style.transform = 'scale(2.2)';
};

window.resetModalZoom = function() {
  const img = document.getElementById('modal-product-img');
  if (img) {
    img.style.transform = 'scale(1)';
    img.style.transformOrigin = 'center center';
  }
};

// Dual Action 1: "Request Formal Quotation" (Pre-fills quote form & scrolls)
window.requestQuoteFromModal = function() {
  if (!currentModalItem) return;

  const catMap = {
    'street-wear': 'Street Wear',
    'gym-wear': 'Gym Wear',
    'leather-wear': 'Leather Wear',
    'sports-wear': 'Sports Wear',
    'active-wear': 'Active Wear',
    'headwear-gear': 'Headwear & Bespoke Gear'
  };

  const quoteCategory = document.getElementById('quote-category');
  const quoteNotes = document.getElementById('quote-notes');
  const quoteSec = document.getElementById('quote');
  const pantoneInput = document.getElementById('modal-pantone-input');
  const pantoneVal = pantoneInput ? pantoneInput.value.trim() : '';

  if (quoteCategory && catMap[currentModalCatKey]) {
    quoteCategory.value = catMap[currentModalCatKey];
  }

  if (quoteNotes) {
    let noteText = `Requesting formal custom manufacturing quote for: ${currentModalItem.name}.\n`;
    noteText += `• Target MOQ: 30 Pieces\n`;
    if (currentModalItem.gsm) noteText += `• Target Fabric / GSM: ${currentModalItem.gsm}\n`;
    if (currentModalItem.stitching) noteText += `• Stitching Requirement: ${currentModalItem.stitching}\n`;
    if (currentModalItem.printStyles) noteText += `• Print Preferences: ${currentModalItem.printStyles}\n`;
    if (pantoneVal) noteText += `• Selected Color / Pantone: ${pantoneVal}\n`;
    noteText += `• Inclusions Needed: Sample turnaround time, tiered bulk pricing, custom branding / woven labels.`;
    quoteNotes.value = noteText;
  }

  const itemName = currentModalItem.name;
  closeProductModal();

  if (quoteSec) {
    quoteSec.scrollIntoView({ behavior: 'smooth' });
    showNotification(`Selected "${itemName}" — specify your requirements below!`);
  }
};

// Dual Action 2: "Inquire via WhatsApp" (Launches direct WhatsApp chat with product title pre-filled)
window.inquireWhatsAppFromModal = function() {
  if (!currentModalItem) return;

  const pantoneInput = document.getElementById('modal-pantone-input');
  const pantoneVal = pantoneInput && pantoneInput.value.trim() ? pantoneInput.value.trim() : 'Factory Standard / Brand Colorway';
  const catTitle = CATEGORY_DATA[currentModalCatKey]?.title || 'Custom Garments';

  const msg = encodeURIComponent(
    `*SAZ WEARZ - FORMAL PRODUCTION INQUIRY*\n` +
    `-----------------------------------------\n` +
    `• *Product Item:* ${currentModalItem.name}\n` +
    `• *Category:* ${catTitle}\n` +
    `• *Fabric Weight / GSM:* ${currentModalItem.gsm || currentModalItem.tag}\n` +
    `• *Stitching Type:* ${currentModalItem.stitching || 'Export Grade'}\n` +
    `• *Print Styles:* ${currentModalItem.printStyles || 'Custom'}\n` +
    `• *Embroidery:* ${currentModalItem.embroideryStyles || 'Custom'}\n` +
    `• *Target MOQ:* 30 Pieces\n` +
    `• *Color / Pantone:* ${pantoneVal}\n` +
    `• *Factory Origin:* Sialkot, Pakistan\n\n` +
    `Hi Saz Wearz Team, I would like to receive fabric swatches, sample prototyping cost, and bulk tiered pricing for this item.`
  );

  window.open(`https://wa.me/923010850746?text=${msg}`, '_blank');
};

// Card Front/Back View Swapper
window.swapCardImage = function(imgId, newSrc, btnEl, event) {
  if (event) {
    event.stopPropagation();
  }
  const img = document.getElementById(imgId);
  if (img) {
    img.src = newSrc;
  }
  if (btnEl && btnEl.parentElement) {
    btnEl.parentElement.querySelectorAll('.view-btn').forEach(b => {
      b.classList.remove('bg-blue-600', 'text-white', 'active-view');
      b.classList.add('text-slate-300');
    });
    btnEl.classList.add('bg-blue-600', 'text-white', 'active-view');
    btnEl.classList.remove('text-slate-300');
  }
};

// Quick triggers from product cards
window.quickSelectForQuote = function(itemName, event) {
  if (event) event.stopPropagation();

  const quoteNotes = document.getElementById('quote-notes');
  const quoteSec = document.getElementById('quote');

  if (quoteNotes) {
    quoteNotes.value = `Requesting custom manufacturing quote for: ${itemName}.\nPlease advise fabric options, sample turnaround time, and bulk tiered pricing for low MOQ (from 30 pieces).`;
  }

  if (quoteSec) {
    quoteSec.scrollIntoView({ behavior: 'smooth' });
    showNotification(`Selected "${itemName}" — specify your requirements below!`);
  }
};

window.quickChatWhatsApp = function(itemName, event) {
  if (event) event.stopPropagation();

  const msg = encodeURIComponent(
    `*SAZ WEARZ - PRODUCTION INQUIRY*\n` +
    `-----------------------------------------\n` +
    `• *Product Item:* ${itemName}\n` +
    `• *Factory Origin:* Sialkot, Pakistan\n` +
    `• *Target MOQ:* 30 Pieces\n\n` +
    `Hi Saz Wearz Team, I would like to receive fabric swatches and sample prototyping costing for this item.`
  );
  window.open(`https://wa.me/923010850746?text=${msg}`, '_blank');
};

// 5. Ultra-Premium Studio-Grade 3D / 2D Customizer Tool ("SAZ 3D / 2D Studio Lab")
const GARMENT_SVGS = {
  hoodie: {
    name: 'Heavyweight Hoodie (450 GSM French Terry)',
    front: {
      path: "M 60,65 Q 90,35 120,40 Q 150,35 180,65 L 215,100 L 195,125 L 175,105 L 175,210 L 65,210 L 65,105 L 45,125 L 25,100 Z",
      details: "M 95,45 Q 120,70 145,45 M 115,55 L 115,75 M 125,55 L 125,75 M 85,155 L 155,155 L 165,195 L 75,195 Z M 65,200 L 175,200"
    },
    back: {
      path: "M 60,65 Q 90,38 120,40 Q 150,38 180,65 L 215,100 L 195,125 L 175,105 L 175,210 L 65,210 L 65,105 L 45,125 L 25,100 Z",
      details: "M 85,42 Q 120,95 155,42 M 65,200 L 175,200 M 65,105 Q 120,115 175,105"
    },
    side: {
      path: "M 100,55 Q 120,35 140,55 Q 150,75 145,100 L 155,195 L 138,210 L 98,210 L 92,105 Q 88,75 100,55 Z",
      details: "M 105,45 Q 135,45 130,85 M 112,85 L 140,185 M 98,202 L 138,202"
    }
  },
  tshirt: {
    name: 'Oversized Vintage T-Shirt (240 GSM)',
    front: {
      path: "M 70,55 Q 95,30 120,35 Q 145,30 170,55 L 215,85 L 195,115 L 170,100 L 170,215 L 70,215 L 70,100 L 45,115 L 25,85 Z",
      details: "M 98,38 Q 120,60 142,38 M 70,205 L 170,205 M 170,100 L 195,115 M 70,100 L 45,115"
    },
    back: {
      path: "M 70,55 Q 95,30 120,35 Q 145,30 170,55 L 215,85 L 195,115 L 170,100 L 170,215 L 70,215 L 70,100 L 45,115 L 25,85 Z",
      details: "M 98,38 Q 120,46 142,38 M 70,205 L 170,205 M 70,68 Q 120,78 170,68"
    },
    side: {
      path: "M 102,48 Q 122,38 138,48 L 152,95 L 146,120 L 136,105 L 140,215 L 98,215 L 98,105 L 90,118 L 82,95 Z",
      details: "M 105,46 Q 120,52 135,46 M 118,52 L 118,215 M 98,205 L 140,205"
    }
  },
  jacket: {
    name: 'Bespoke Cowhide Leather Biker Jacket',
    front: {
      path: "M 65,58 L 100,42 L 140,42 L 175,58 L 220,92 L 198,122 L 172,102 L 172,212 L 68,212 L 68,102 L 42,122 L 20,92 Z",
      details: "M 100,42 L 130,85 L 105,95 L 85,62 M 140,42 L 115,85 L 138,110 L 158,62 M 130,85 L 118,212 M 78,145 L 105,135 M 135,160 L 162,150 M 68,202 L 172,202"
    },
    back: {
      path: "M 65,58 L 100,42 L 140,42 L 175,58 L 220,92 L 198,122 L 172,102 L 172,212 L 68,212 L 68,102 L 42,122 L 20,92 Z",
      details: "M 100,42 Q 120,48 140,42 M 68,85 L 172,85 M 95,85 L 90,202 M 145,85 L 150,202 M 68,202 L 172,202"
    },
    side: {
      path: "M 98,52 L 132,45 L 150,88 L 146,130 L 134,115 L 142,212 L 96,212 L 92,112 L 86,128 Z",
      details: "M 105,50 L 125,75 L 115,90 M 115,90 L 122,212 M 96,202 L 142,202"
    }
  },
  stringer: {
    name: 'Athletic Deep-Cut Gym Stringer',
    front: {
      path: "M 92,45 L 102,45 L 98,75 Q 120,90 142,75 L 138,45 L 148,45 Q 165,75 160,115 L 160,215 L 80,215 L 80,115 Q 75,75 92,45 Z",
      details: "M 98,75 Q 120,90 142,75 M 80,205 L 160,205 M 92,45 L 102,45 M 138,45 L 148,45"
    },
    back: {
      path: "M 112,45 L 128,45 L 125,95 Q 155,108 160,125 L 160,215 L 80,215 L 80,125 Q 85,108 115,95 Z",
      details: "M 112,45 L 128,45 L 122,95 L 118,95 Z M 80,205 L 160,205"
    },
    side: {
      path: "M 110,45 L 125,45 L 132,95 Q 140,135 135,215 L 102,215 Q 98,135 106,95 Z",
      details: "M 110,45 Q 118,85 118,215 M 102,205 L 135,205"
    }
  },
  jersey: {
    name: 'Full-Sublimation Sports Jersey',
    front: {
      path: "M 68,52 L 120,38 L 172,52 L 218,80 L 198,110 L 170,95 L 170,215 L 70,215 L 70,95 L 42,110 L 22,80 Z",
      details: "M 105,42 L 120,70 L 135,42 M 85,95 L 85,215 M 155,95 L 155,215 M 70,205 L 170,205"
    },
    back: {
      path: "M 68,52 L 120,38 L 172,52 L 218,80 L 198,110 L 170,95 L 170,215 L 70,215 L 70,95 L 42,110 L 22,80 Z",
      details: "M 105,42 Q 120,48 135,42 M 85,95 L 85,215 M 155,95 L 155,215 M 95,95 Q 120,115 145,95 M 70,205 L 170,205"
    },
    side: {
      path: "M 102,48 Q 120,40 138,48 L 158,88 L 145,115 L 134,100 L 138,215 L 98,215 L 102,100 L 88,115 L 80,88 Z",
      details: "M 118,45 L 118,215 M 108,95 L 128,95 M 98,205 L 138,205"
    }
  },
  snapback: {
    name: 'Custom 6-Panel Snapback & Dad Hat',
    front: {
      path: "M 45,145 Q 45,70 120,65 Q 195,70 195,145 L 215,165 Q 120,185 25,165 Z",
      details: "M 120,65 L 120,145 M 82,75 L 82,145 M 158,75 L 158,145 M 45,145 Q 120,155 195,145 M 115,63 A 5,3 0 1,1 125,63"
    },
    back: {
      path: "M 45,145 Q 45,70 120,65 Q 195,70 195,145 L 215,165 Q 120,185 25,165 Z",
      details: "M 90,145 Q 120,105 150,145 M 92,140 L 148,140 M 115,63 A 5,3 0 1,1 125,63 M 45,145 Q 120,155 195,145"
    },
    side: {
      path: "M 75,145 Q 85,75 145,75 Q 185,85 185,145 L 225,152 Q 220,165 175,162 L 75,152 Z",
      details: "M 135,75 L 135,145 M 105,95 Q 145,115 175,145 M 140,73 A 4,3 0 1,1 148,73"
    }
  },
  cargos: {
    name: 'Tactical Multi-Pocket Cargo Pants',
    front: {
      path: "M 75,55 L 165,55 L 170,110 L 160,215 L 130,215 L 120,110 L 110,215 L 80,215 L 70,110 Z",
      details: "M 75,68 L 165,68 M 120,68 L 120,105 M 65,115 L 75,115 L 75,155 L 65,155 Z M 165,115 L 175,115 L 175,155 L 165,155 Z M 88,140 L 105,140 M 135,140 L 152,140"
    },
    back: {
      path: "M 75,55 L 165,55 L 170,110 L 160,215 L 130,215 L 120,110 L 110,215 L 80,215 L 70,110 Z",
      details: "M 75,68 L 165,68 M 82,85 L 110,85 L 110,110 L 82,110 Z M 130,85 L 158,85 L 158,110 L 130,110 Z M 120,68 L 120,115"
    },
    side: {
      path: "M 100,55 L 140,55 Q 148,110 142,215 L 105,215 Q 96,110 100,55 Z",
      details: "M 100,68 L 140,68 M 118,68 L 120,215 M 135,115 L 148,115 L 148,155 L 135,155 Z"
    }
  },
  leggings: {
    name: 'Seamless Ribbed Scrunch Leggings (320 GSM)',
    front: {
      path: "M 82,60 Q 120,55 158,60 L 162,110 L 150,220 L 128,220 L 120,110 L 112,220 L 90,220 L 78,110 Z",
      details: "M 82,75 Q 120,70 158,75 M 120,75 L 120,110 M 85,130 Q 105,155 95,190 M 155,130 Q 135,155 145,190"
    },
    back: {
      path: "M 82,60 Q 120,55 158,60 L 162,110 L 150,220 L 128,220 L 120,110 L 112,220 L 90,220 L 78,110 Z",
      details: "M 82,75 Q 120,82 158,75 M 120,78 Q 118,95 120,110 M 100,90 Q 120,105 140,90"
    },
    side: {
      path: "M 102,60 Q 124,56 138,60 Q 148,95 142,135 Q 138,180 134,220 L 112,220 Q 104,180 102,135 Z",
      details: "M 102,75 Q 120,72 138,75 M 118,75 Q 122,145 122,220"
    }
  },
  windbreaker: {
    name: 'Technical Hooded Windbreaker (DWR Ripstop)',
    front: {
      path: "M 62,62 Q 90,32 120,36 Q 150,32 178,62 L 216,95 L 195,122 L 174,102 L 174,212 L 66,212 L 66,102 L 45,122 L 24,95 Z",
      details: "M 92,42 Q 120,65 148,42 M 120,42 L 120,212 M 72,135 L 98,125 M 142,125 L 168,135 M 66,204 L 174,204"
    },
    back: {
      path: "M 62,62 Q 90,35 120,38 Q 150,35 178,62 L 216,95 L 195,122 L 174,102 L 174,212 L 66,212 L 66,102 L 45,122 L 24,95 Z",
      details: "M 88,40 Q 120,80 152,40 M 66,95 L 174,95 M 66,204 L 174,204"
    },
    side: {
      path: "M 100,52 Q 120,32 140,52 Q 152,75 146,102 L 155,198 L 138,212 L 96,212 L 92,105 Q 88,75 100,52 Z",
      details: "M 105,42 Q 135,42 128,82 M 115,82 L 140,190 M 96,204 L 138,204"
    }
  },
  gymgloves: {
    name: 'Pro Tactical Fingerless Gym Gloves',
    front: {
      path: "M 65,130 L 68,90 L 85,60 L 105,60 L 115,85 L 125,60 L 145,60 L 155,85 L 165,65 L 180,68 L 182,130 L 175,190 L 72,190 Z",
      details: "M 75,120 Q 120,135 170,120 M 90,140 L 110,140 L 105,170 L 90,170 Z M 135,140 L 155,140 L 155,170 L 140,170 Z M 72,175 L 175,175"
    },
    back: {
      path: "M 65,130 L 68,90 L 85,60 L 105,60 L 115,85 L 125,60 L 145,60 L 155,85 L 165,65 L 180,68 L 182,130 L 175,190 L 72,190 Z",
      details: "M 85,100 Q 120,90 160,100 M 80,140 L 165,140 M 72,170 L 175,170 M 100,170 L 145,170"
    },
    side: {
      path: "M 95,75 L 135,75 Q 148,110 142,190 L 98,190 Q 90,110 95,75 Z",
      details: "M 95,120 L 142,120 M 98,175 L 142,175"
    }
  },
  bikergloves: {
    name: 'Handcrafted Leather Biker Gloves',
    front: {
      path: "M 62,125 L 68,75 L 85,45 L 105,45 L 115,75 L 125,45 L 145,45 L 155,75 L 168,52 L 182,55 L 184,125 L 180,205 L 68,205 Z",
      details: "M 72,115 Q 120,128 175,115 M 95,130 L 115,130 L 110,165 L 90,165 Z M 130,130 L 155,130 L 150,165 L 130,165 Z M 68,185 L 180,185"
    },
    back: {
      path: "M 62,125 L 68,75 L 85,45 L 105,45 L 115,75 L 125,45 L 145,45 L 155,75 L 168,52 L 182,55 L 184,125 L 180,205 L 68,205 Z",
      details: "M 80,95 Q 120,80 165,95 L 155,120 Q 120,110 90,120 Z M 85,145 L 160,145 M 68,185 L 180,185 M 95,185 L 150,185"
    },
    side: {
      path: "M 92,60 L 138,60 Q 152,105 145,205 L 95,205 Q 86,105 92,60 Z",
      details: "M 92,105 Q 115,95 145,105 M 95,185 L 145,185"
    }
  }
};

let customizerState = {
  silhouetteKey: 'hoodie',
  garmentName: 'Heavyweight Hoodie (450 GSM French Terry)',
  viewMode: '3d', // '3d', 'front', 'back', 'side', 'stitch'
  fabricClass: 'texture-french-terry',
  fabricName: '450 GSM Heavy French Terry',
  lightingPreset: 'neutral', // 'neutral', 'spotlight', 'cyber'
  colorHex: '#0B1120',
  colorName: 'Midnight Navy',
  logoPlacement: 'Chest Center',
  printStyle: '3D High-Density Puff',
  finishClass: 'finish-3d-puff',
  finishName: '3D Puff Screen Print',
  scale: 100,
  rotation: 0,
  logoDataUrl: null,
  sizes: { 'XS': 5, 'S': 10, 'M': 15, 'L': 15, 'XL': 10, '2XL': 5, '3XL': 0 },
  totalQty: 60
};

// Global Studio Lab Handlers for Interactive 3D/2D Canvas
window.handleStudio3DTilt = function(e) {
  if (customizerState.viewMode !== '3d') return;
  const box = document.getElementById('studio-canvas-box');
  const hud = document.getElementById('studio-tilt-hud');
  if (!box) return;

  const rect = box.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const maxTilt = 18;
  const tiltY = ((x - centerX) / centerX) * maxTilt;
  const tiltX = -((y - centerY) / centerY) * maxTilt;

  box.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(1)}deg) rotateY(${tiltY.toFixed(1)}deg) scale3d(1.02, 1.02, 1.02)`;

  if (hud) {
    hud.textContent = `3D Tilt: ${tiltX > 0 ? '+' : ''}${tiltX.toFixed(0)}° / ${tiltY > 0 ? '+' : ''}${tiltY.toFixed(0)}°`;
  }
};

window.resetStudio3DTilt = function() {
  const box = document.getElementById('studio-canvas-box');
  const hud = document.getElementById('studio-tilt-hud');
  if (!box) return;

  box.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  if (hud) {
    hud.textContent = customizerState.viewMode === '3d' ? '3D Tilt: 0° / 0°' : `View: ${customizerState.viewMode.toUpperCase()}`;
  }
};

window.setStudioViewMode = function(mode, btnEl) {
  customizerState.viewMode = mode;

  // Update button active styling across all 5 angle controls
  const buttons = [
    { id: 'btn-view-3d', mode: '3d' },
    { id: 'btn-view-front', mode: 'front' },
    { id: 'btn-view-back', mode: 'back' },
    { id: 'btn-view-side', mode: 'side' },
    { id: 'btn-view-stitch', mode: 'stitch' }
  ];
  buttons.forEach(b => {
    const btn = document.getElementById(b.id);
    if (!btn) return;
    if (b.mode === mode) {
      btn.className = 'px-2 py-1 rounded-lg text-[10px] font-bold transition-all bg-sky-500 text-white shadow-sm flex items-center gap-1';
    } else {
      btn.className = 'px-2 py-1 rounded-lg text-[10px] font-bold text-slate-300 hover:text-white transition-all';
    }
  });

  const box = document.getElementById('studio-canvas-box');
  const garmentSvg = document.getElementById('garment-svg');
  const viewIndicator = document.getElementById('studio-view-indicator');
  const hud = document.getElementById('studio-tilt-hud');
  const placementSelect = document.getElementById('customizer-placement-select');

  // Reset any macro stitch zoom unless in stitch mode
  if (garmentSvg) {
    if (mode === 'stitch') {
      garmentSvg.classList.add('macro-stitching-zoom');
    } else {
      garmentSvg.classList.remove('macro-stitching-zoom');
    }
  }

  if (mode === '3d') {
    if (viewIndicator) viewIndicator.textContent = '3D Dynamic';
    if (hud) hud.textContent = '3D Tilt: 0° / 0°';
    if (box) {
      box.classList.add('studio-3d-active');
      box.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    }
    renderGarmentSvg('front');
  } else if (mode === 'front') {
    if (viewIndicator) viewIndicator.textContent = '2D Front';
    if (hud) hud.textContent = 'View: 2D Front';
    if (box) {
      box.classList.remove('studio-3d-active');
      box.style.transform = 'none';
    }
    renderGarmentSvg('front');
  } else if (mode === 'back') {
    if (viewIndicator) viewIndicator.textContent = '2D Back';
    if (hud) hud.textContent = 'View: 2D Back';
    if (box) {
      box.classList.remove('studio-3d-active');
      box.style.transform = 'none';
    }
    renderGarmentSvg('back');
    if (placementSelect && (customizerState.logoPlacement === 'Chest Center' || customizerState.logoPlacement === 'Left Chest')) {
      placementSelect.value = 'Full Back';
      updateLogoPlacement('Full Back');
    }
  } else if (mode === 'side') {
    if (viewIndicator) viewIndicator.textContent = 'Side Profile';
    if (hud) hud.textContent = 'View: Side Profile';
    if (box) {
      box.classList.remove('studio-3d-active');
      box.style.transform = 'none';
    }
    renderGarmentSvg('side');
    if (placementSelect && customizerState.logoPlacement !== 'Sleeve') {
      placementSelect.value = 'Sleeve';
      updateLogoPlacement('Sleeve');
    }
  } else if (mode === 'stitch') {
    if (viewIndicator) viewIndicator.textContent = 'Macro Needlework';
    if (hud) hud.textContent = 'Zoom: 2.2x Seam & Stitch';
    if (box) {
      box.classList.remove('studio-3d-active');
      box.style.transform = 'none';
    }
    renderGarmentSvg('front');
  }
};

window.setStudioLighting = function(preset, btnEl) {
  customizerState.lightingPreset = preset;

  const presets = ['neutral', 'spotlight', 'cyber'];
  presets.forEach(p => {
    const btn = document.getElementById(`btn-light-${p}`);
    if (btn) {
      if (p === preset) {
        btn.className = 'px-2 py-0.5 rounded text-[10px] font-bold transition-all bg-sky-500/20 text-sky-300 border border-sky-400/40';
      } else {
        btn.className = 'px-2 py-0.5 rounded text-[10px] font-bold transition-all text-slate-400 hover:text-white';
      }
    }
  });

  const box = document.getElementById('studio-canvas-box');
  if (box) {
    box.classList.remove('studio-lighting-neutral', 'studio-lighting-spotlight', 'studio-lighting-cyber');
    box.classList.add(`studio-lighting-${preset}`);
  }
};

// Global Helper to render SVG paths according to current garment silhouette & view angle
function renderGarmentSvg(angle) {
  const currentGarment = GARMENT_SVGS[customizerState.silhouetteKey] || GARMENT_SVGS['hoodie'];
  const viewData = currentGarment[angle] || currentGarment['front'];
  const pathEl = document.getElementById('garment-svg-path');
  const detailsEl = document.getElementById('garment-svg-details');

  if (pathEl) {
    pathEl.setAttribute('d', viewData.path);
    pathEl.setAttribute('fill', customizerState.colorHex);
  }
  if (detailsEl) {
    detailsEl.setAttribute('d', viewData.details);
  }
}

// Global Helper to update logo placement classes and transform
function updateLogoPlacement(val) {
  const logoOverlay = document.getElementById('customizer-logo-overlay');
  const activePlacement = document.getElementById('customizer-active-placement');
  customizerState.logoPlacement = val;

  if (activePlacement) {
    activePlacement.textContent = val;
  }

  if (logoOverlay) {
    const finishClass = customizerState.finishClass || 'finish-3d-puff';
    logoOverlay.className = `customizer-logo-overlay ${finishClass}`;

    if (val === 'Chest Center') logoOverlay.classList.add('logo-pos-chest-center');
    else if (val === 'Left Chest') logoOverlay.classList.add('logo-pos-left-chest');
    else if (val === 'Full Back') logoOverlay.classList.add('logo-pos-full-back');
    else if (val === 'Sleeve') logoOverlay.classList.add('logo-pos-sleeve');
    else if (val === 'Waistband / Hem') logoOverlay.classList.add('logo-pos-waistband');
    else if (val === 'Hood' || val === 'Hood / Collar') logoOverlay.classList.add('logo-pos-hood');

    updateArtworkTransform();
  }
  updateTechPackPreview();
}

// Global Helper to apply scale and rotation transform
function updateArtworkTransform() {
  const logoOverlay = document.getElementById('customizer-logo-overlay');
  if (logoOverlay) {
    const scale = customizerState.scale / 100;
    const rot = customizerState.rotation;
    logoOverlay.style.transform = `translate(-50%, -50%) scale(${scale}) rotate(${rot}deg)`;
  }
  updateTechPackPreview();
}

// Global Helper to reset artwork transform
window.resetArtworkTransform = function() {
  customizerState.scale = 100;
  customizerState.rotation = 0;
  const scaleSlider = document.getElementById('artwork-scale-slider');
  const scaleVal = document.getElementById('artwork-scale-val');
  const rotSlider = document.getElementById('artwork-rot-slider');
  const rotVal = document.getElementById('artwork-rot-val');

  if (scaleSlider) scaleSlider.value = 100;
  if (scaleVal) scaleVal.textContent = '100%';
  if (rotSlider) rotSlider.value = 0;
  if (rotVal) rotVal.textContent = '0°';

  updateArtworkTransform();
  showNotification('Artwork scale and rotation reset to default center alignment.');
};

// Global Helper to synchronize the live Production Tech Pack Preview Card
function updateTechPackPreview() {
  const tpGarment = document.getElementById('techpack-garment');
  const tpFabric = document.getElementById('techpack-fabric');
  const tpColor = document.getElementById('techpack-color');
  const tpFinish = document.getElementById('techpack-finish');
  const tpPlacement = document.getElementById('techpack-placement');
  const tpTransform = document.getElementById('techpack-transform');

  if (tpGarment) tpGarment.textContent = customizerState.garmentName.split('(')[0].trim();
  if (tpFabric) tpFabric.textContent = customizerState.fabricName;
  if (tpColor) tpColor.textContent = `${customizerState.colorName} (${customizerState.colorHex})`;
  if (tpFinish) tpFinish.textContent = customizerState.finishName;
  if (tpPlacement) tpPlacement.textContent = customizerState.logoPlacement;
  if (tpTransform) tpTransform.textContent = `${customizerState.scale}% | ${customizerState.rotation}°`;
}

function initProductCustomizer() {
  const silhouetteSelect = document.getElementById('customizer-garment-select');
  const fabricSelect = document.getElementById('customizer-fabric-select');
  const fabricBadge = document.getElementById('customizer-fabric-badge');
  const colorSwatches = document.querySelectorAll('.customizer-color-swatch');
  const colorPicker = document.getElementById('customizer-color-picker');
  const pantoneInput = document.getElementById('customizer-pantone');
  const placementSelect = document.getElementById('customizer-placement-select');
  const finishSelect = document.getElementById('customizer-finish-select');
  const logoUploadInput = document.getElementById('customizer-logo-upload');
  const logoOverlay = document.getElementById('customizer-logo-overlay');
  const totalQtyDisplay = document.getElementById('customizer-total-qty');
  const scaleSlider = document.getElementById('artwork-scale-slider');
  const scaleVal = document.getElementById('artwork-scale-val');
  const rotSlider = document.getElementById('artwork-rot-slider');
  const rotVal = document.getElementById('artwork-rot-val');
  const canvasBox = document.getElementById('studio-canvas-box');

  // Initial silhouette render & techpack synchronization
  renderGarmentSvg('front');
  updateArtworkTransform();
  updateTechPackPreview();

  // 1. Garment silhouette change
  if (silhouetteSelect) {
    silhouetteSelect.addEventListener('change', (e) => {
      const val = e.target.value;
      customizerState.silhouetteKey = val;
      const config = GARMENT_SVGS[val];
      if (config) {
        customizerState.garmentName = config.name;
      } else {
        customizerState.garmentName = val;
      }
      let currentAngle = 'front';
      if (customizerState.viewMode === 'back') currentAngle = 'back';
      else if (customizerState.viewMode === 'side') currentAngle = 'side';
      renderGarmentSvg(currentAngle);
      updateTechPackPreview();
    });
  }

  // 2. Real-Time Material & Fabric Engine
  if (fabricSelect) {
    fabricSelect.addEventListener('change', (e) => {
      const val = e.target.value;
      const optText = fabricSelect.options[fabricSelect.selectedIndex].text;
      customizerState.fabricClass = val;
      customizerState.fabricName = optText.split('(')[0].trim();

      if (fabricBadge) {
        fabricBadge.textContent = optText.split('(')[0].trim();
      }

      if (canvasBox) {
        const allTextures = ['texture-french-terry', 'texture-fleece', 'texture-nappa-leather', 'texture-yoga-spandex', 'texture-ripstop'];
        allTextures.forEach(t => canvasBox.classList.remove(t));
        canvasBox.classList.add(val);
      }
      updateTechPackPreview();
    });
  }

  // 3. Color Swatch Change
  colorSwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      colorSwatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');

      const hex = swatch.getAttribute('data-hex');
      const name = swatch.getAttribute('data-name');
      customizerState.colorHex = hex;
      customizerState.colorName = name;

      const pathEl = document.getElementById('garment-svg-path');
      if (pathEl) {
        pathEl.setAttribute('fill', hex);
      }
      const colorLabel = document.getElementById('customizer-color-label');
      if (colorLabel) {
        colorLabel.textContent = `${name} (${hex})`;
      }
      if (colorPicker) {
        colorPicker.value = hex;
      }
      updateTechPackPreview();
    });
  });

  // Direct Color Picker
  if (colorPicker) {
    colorPicker.addEventListener('input', (e) => {
      const hex = e.target.value;
      colorSwatches.forEach(s => s.classList.remove('active'));
      customizerState.colorHex = hex;
      customizerState.colorName = 'Custom Tint';

      const pathEl = document.getElementById('garment-svg-path');
      if (pathEl) {
        pathEl.setAttribute('fill', hex);
      }
      const colorLabel = document.getElementById('customizer-color-label');
      if (colorLabel) {
        colorLabel.textContent = `Custom (${hex.toUpperCase()})`;
      }
      updateTechPackPreview();
    });
  }

  // Custom Pantone Code
  if (pantoneInput) {
    pantoneInput.addEventListener('input', (e) => {
      const val = e.target.value.trim();
      if (val) {
        customizerState.colorName = `Pantone / Custom (${val})`;
        const colorLabel = document.getElementById('customizer-color-label');
        if (colorLabel) {
          colorLabel.textContent = customizerState.colorName;
        }
        if (val.startsWith('#')) {
          customizerState.colorHex = val;
          const pathEl = document.getElementById('garment-svg-path');
          if (pathEl) pathEl.setAttribute('fill', val);
        }
        updateTechPackPreview();
      }
    });
  }

  // 4. Logo Placement Change
  if (placementSelect) {
    placementSelect.addEventListener('change', (e) => {
      updateLogoPlacement(e.target.value);
    });
  }

  // 5. Decoration Technique & Tactile Finish
  if (finishSelect) {
    finishSelect.addEventListener('change', (e) => {
      const val = e.target.value;
      const text = finishSelect.options[finishSelect.selectedIndex].text;
      customizerState.finishClass = val;
      customizerState.finishName = text;

      if (logoOverlay) {
        const allFinishes = [
          'finish-3d-puff',
          'finish-screen-print',
          'finish-dtg',
          'finish-chenille',
          'finish-woven-tag',
          'finish-debossed-leather',
          'finish-metallic'
        ];
        allFinishes.forEach(f => logoOverlay.classList.remove(f));
        logoOverlay.classList.add(val);
      }
      updateTechPackPreview();
    });
  }

  // 6. Artwork Transform Sliders (Scale & Rotation)
  if (scaleSlider) {
    scaleSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      customizerState.scale = val;
      if (scaleVal) scaleVal.textContent = `${val}%`;
      updateArtworkTransform();
    });
  }

  if (rotSlider) {
    rotSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      customizerState.rotation = val;
      if (rotVal) rotVal.textContent = `${val}°`;
      updateArtworkTransform();
    });
  }

  // Logo Upload
  if (logoUploadInput && logoOverlay) {
    logoUploadInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = function(evt) {
          logoOverlay.src = evt.target.result;
          customizerState.logoDataUrl = evt.target.result;
          showNotification('Custom logo uploaded & mapped onto mockup canvas!');
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    });
  }

  // Size Steppers
  document.querySelectorAll('.customizer-size-input').forEach(input => {
    input.addEventListener('input', () => {
      recalcTotalQty();
    });
  });

  function recalcTotalQty() {
    let sum = 0;
    document.querySelectorAll('.customizer-size-input').forEach(input => {
      const sizeKey = input.getAttribute('data-size');
      const val = parseInt(input.value || '0', 10);
      customizerState.sizes[sizeKey] = val;
      sum += val;
    });
    customizerState.totalQty = sum;
    if (totalQtyDisplay) {
      totalQtyDisplay.textContent = `${sum} Pieces Total`;
      if (sum < 30) {
        totalQtyDisplay.classList.add('text-amber-400');
        totalQtyDisplay.classList.remove('text-emerald-400');
      } else {
        totalQtyDisplay.classList.remove('text-amber-400');
        totalQtyDisplay.classList.add('text-emerald-400');
      }
    }
  }

  // Direct Submission 1: "Send via WhatsApp"
  const customizerWhatsAppBtn = document.getElementById('customizer-submit-whatsapp');
  if (customizerWhatsAppBtn) {
    customizerWhatsAppBtn.addEventListener('click', () => {
      const sizeBreakdown = Object.entries(customizerState.sizes)
        .filter(([_, count]) => count > 0)
        .map(([size, count]) => `${size}: ${count}`)
        .join(', ');

      const msg = encodeURIComponent(
        `*SAZ WEARZ - BESPOKE 3D/2D STUDIO LAB SPECIFICATION*\n` +
        `==========================================\n` +
        `• *Garment Silhouette:* ${customizerState.garmentName}\n` +
        `• *Fabric Specification:* ${customizerState.fabricName}\n` +
        `• *Base Fabric Color:* ${customizerState.colorName} (${customizerState.colorHex})\n` +
        `• *Placement Zone:* ${customizerState.logoPlacement}\n` +
        `• *Decoration Technique:* ${customizerState.finishName}\n` +
        `• *Artwork Scale / Rotation:* ${customizerState.scale}% | ${customizerState.rotation}°\n` +
        `• *Size Breakdown:* ${sizeBreakdown || 'Assorted (XS-3XL)'}\n` +
        `• *Total Production Volume:* ${customizerState.totalQty} Pieces (Universal Low MOQ: 30 Pcs)\n\n` +
        `Hi Saz Wearz Factory Desk, I have configured this 3D/2D custom apparel tech-pack. Please confirm sample prototyping feasibility & formal export quotation.`
      );

      window.open(`https://wa.me/923010850746?text=${msg}`, '_blank');
    });
  }

  // Direct Submission 2: "Submit via Email Form"
  const customizerEmailBtn = document.getElementById('customizer-submit-email');
  if (customizerEmailBtn) {
    customizerEmailBtn.addEventListener('click', () => {
      const quoteNotes = document.getElementById('quote-notes');
      const quoteSec = document.getElementById('quote');

      const sizeBreakdown = Object.entries(customizerState.sizes)
        .filter(([_, count]) => count > 0)
        .map(([size, count]) => `${size}: ${count}`)
        .join(', ');

      if (quoteNotes) {
        quoteNotes.value = `SAZ 3D/2D STUDIO LAB SPECIFICATION:\n` +
          `• Garment: ${customizerState.garmentName}\n` +
          `• Fabric: ${customizerState.fabricName}\n` +
          `• Base Color: ${customizerState.colorName} (${customizerState.colorHex})\n` +
          `• Placement: ${customizerState.logoPlacement}\n` +
          `• Decoration: ${customizerState.finishName}\n` +
          `• Scale / Rotation: ${customizerState.scale}% | ${customizerState.rotation}°\n` +
          `• Sizing Breakdown: ${sizeBreakdown}\n` +
          `• Total Quantity: ${customizerState.totalQty} Pieces (Universal Low MOQ: 30 Pcs)`;
      }

      if (quoteSec) {
        quoteSec.scrollIntoView({ behavior: 'smooth' });
        showNotification('Studio Lab tech pack specs transferred to official quote form!');
      }
    });
  }
}

// 6. Global Export Map Tooltip Pins
const MAP_HUBS = {
  'usa': {
    city: 'United States (New York & Los Angeles)',
    transit: '3–4 Business Days via DHL Express DDP',
    brands: '18+ Active Streetwear & Gymwear Labels'
  },
  'uk': {
    city: 'United Kingdom (London & Manchester)',
    transit: '3–4 Business Days via FedEx Priority DDP',
    brands: '14+ Active Performance Brands'
  },
  'germany': {
    city: 'Germany & Mainland Europe (Berlin, Frankfurt, Paris)',
    transit: '3–4 Business Days via DHL Express DDP',
    brands: '10+ Active European Fashion Houses'
  },
  'canada': {
    city: 'Canada (Toronto & Vancouver)',
    transit: '3–5 Business Days via FedEx Priority',
    brands: '6+ Active Urban Streetwear Brands'
  },
  'aus': {
    city: 'Australia (Melbourne & Sydney)',
    transit: '4–5 Business Days via SkyNet & DHL Express',
    brands: '8+ Active Athleisure & Outerwear Labels'
  }
};

function initMapPins() {
  const pins = document.querySelectorAll('.map-hub-pin');
  const cityEl = document.getElementById('map-tooltip-city');
  const transitEl = document.getElementById('map-tooltip-transit');
  const brandsEl = document.getElementById('map-tooltip-brands');

  pins.forEach(pin => {
    pin.addEventListener('mouseenter', () => {
      const hubKey = pin.getAttribute('data-hub');
      const data = MAP_HUBS[hubKey];
      if (data && cityEl && transitEl && brandsEl) {
        cityEl.textContent = data.city;
        transitEl.textContent = data.transit;
        brandsEl.textContent = data.brands;
      }
    });

    pin.addEventListener('click', () => {
      const hubKey = pin.getAttribute('data-hub');
      const data = MAP_HUBS[hubKey];
      if (data) {
        showNotification(`Export Route: Sialkot ➔ ${data.city} (${data.transit})`);
      }
    });
  });
}

// 7. Quote Form & File Upload
function initFileUpload() {
  const dropZone = document.getElementById('drop-zone');
  const fileInput = document.getElementById('tech-pack-file');
  const filePreview = document.getElementById('file-preview');
  const fileNameDisplay = document.getElementById('file-name');

  if (!dropZone || !fileInput) return;

  dropZone.addEventListener('click', () => fileInput.click());

  ['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropZone.classList.add('border-blue-400', 'bg-blue-500/10');
    });
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropZone.classList.remove('border-blue-400', 'bg-blue-500/10');
    });
  });

  dropZone.addEventListener('drop', (e) => {
    if (e.dataTransfer.files.length) {
      fileInput.files = e.dataTransfer.files;
      handleFileSelected(e.dataTransfer.files[0]);
    }
  });

  fileInput.addEventListener('change', () => {
    if (fileInput.files.length) {
      handleFileSelected(fileInput.files[0]);
    }
  });

  function handleFileSelected(file) {
    if (filePreview && fileNameDisplay) {
      fileNameDisplay.textContent = `${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`;
      filePreview.classList.remove('hidden');
    }
  }
}

function initQuoteForm() {
  const form = document.getElementById('quote-form');
  const whatsappSubmitBtn = document.getElementById('btn-whatsapp-quote');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const fullName = document.getElementById('quote-name').value.trim();
      const brandName = document.getElementById('quote-brand').value.trim();
      const email = document.getElementById('quote-email').value.trim();
      const phone = document.getElementById('quote-phone').value.trim();
      const category = document.getElementById('quote-category').value;
      const qty = document.getElementById('quote-qty').value;
      const notes = document.getElementById('quote-notes').value.trim();

      if (!fullName || !email || !phone) {
        showNotification('Please provide your name, email, and WhatsApp number.', 'error');
        return;
      }

      const modal = document.getElementById('quote-success-modal');
      const modalSummary = document.getElementById('modal-summary');
      if (modal && modalSummary) {
        modalSummary.innerHTML = `
          <div class="space-y-2 text-left text-sm text-slate-300 font-body">
            <p><strong class="text-white">Brand Partner:</strong> ${escapeHtml(brandName || 'Emerging Brand')} (${escapeHtml(fullName)})</p>
            <p><strong class="text-white">Direct Contact:</strong> ${escapeHtml(email)} &bull; ${escapeHtml(phone)}</p>
            <p><strong class="text-white">Category & Volume:</strong> ${escapeHtml(category)} (${escapeHtml(qty)})</p>
            <p class="text-xs text-sky-400 mt-2 font-mono">Status: Technical review logged at Sialkot manufacturing floor. Universal Low MOQ: 30 Pieces.</p>
          </div>
        `;
        modal.classList.remove('hidden');
      }

      form.reset();
      const preview = document.getElementById('file-preview');
      if (preview) preview.classList.add('hidden');
    });
  }

  if (whatsappSubmitBtn) {
    whatsappSubmitBtn.addEventListener('click', () => {
      const fullName = document.getElementById('quote-name').value.trim() || 'Brand Partner';
      const brandName = document.getElementById('quote-brand').value.trim() || 'Fashion Label';
      const email = document.getElementById('quote-email').value.trim();
      const category = document.getElementById('quote-category').value;
      const qty = document.getElementById('quote-qty').value;
      const notes = document.getElementById('quote-notes').value.trim();

      const msg = encodeURIComponent(
        `*SAZ WEARZ - PRODUCTION QUOTE INQUIRY*\n` +
        `-----------------------------------------\n` +
        `• *Client Name:* ${fullName}\n` +
        `• *Brand:* ${brandName}\n` +
        `• *Email:* ${email || 'Provided on chat'}\n` +
        `• *Category:* ${category}\n` +
        `• *Order Quantity:* ${qty}\n` +
        `• *Universal Low MOQ:* 30 Pieces\n` +
        `• *Project Notes:* ${notes || 'Interested in Custom Cut & Sew Manufacturing'}\n\n` +
        `Hi Saz Wearz Team, please review our requirements and let us know sample feasibility & pricing.`
      );

      window.open(`https://wa.me/923010850746?text=${msg}`, '_blank');
    });
  }
}

// 8. Scroll Spy for Navigation Active State
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 130;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-sky-400', 'font-bold');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-sky-400', 'font-bold');
      }
    });
  });
}

// Global Notification Toast
function showNotification(message, type = 'success') {
  let toast = document.getElementById('site-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'site-toast';
    toast.className = 'fixed bottom-20 right-6 z-50 px-5 py-3.5 rounded-xl shadow-2xl transition-all duration-300 transform translate-y-12 opacity-0 flex items-center gap-3 backdrop-blur-md border';
    document.body.appendChild(toast);
  }

  if (type === 'error') {
    toast.className = 'fixed bottom-20 right-6 z-50 px-5 py-3.5 rounded-xl shadow-2xl transition-all duration-300 transform translate-y-0 opacity-100 flex items-center gap-3 bg-red-950/90 text-red-200 border-red-500/40 backdrop-blur-md';
  } else {
    toast.className = 'fixed bottom-20 right-6 z-50 px-5 py-3.5 rounded-xl shadow-2xl transition-all duration-300 transform translate-y-0 opacity-100 flex items-center gap-3 bg-slate-900/90 text-sky-200 border-sky-500/30 backdrop-blur-md';
  }

  toast.innerHTML = `
    <span class="w-2.5 h-2.5 rounded-full ${type === 'error' ? 'bg-red-400' : 'bg-sky-400'} animate-pulse"></span>
    <span class="text-sm font-bold font-body">${message}</span>
  `;

  setTimeout(() => {
    toast.classList.add('translate-y-12', 'opacity-0');
  }, 4000);
}

// 9. Interactive FAQ Accordion
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-btn');
    const answerEl = item.querySelector('.faq-answer');
    const chevron = item.querySelector('.faq-chevron');

    if (!questionBtn || !answerEl) return;

    questionBtn.addEventListener('click', () => {
      const isOpen = answerEl.classList.contains('open');

      faqItems.forEach(otherItem => {
        const otherAns = otherItem.querySelector('.faq-answer');
        const otherChev = otherItem.querySelector('.faq-chevron');
        if (otherAns && otherAns !== answerEl) {
          otherAns.classList.remove('open');
          if (otherChev) otherChev.classList.remove('open');
        }
      });

      if (isOpen) {
        answerEl.classList.remove('open');
        if (chevron) chevron.classList.remove('open');
      } else {
        answerEl.classList.add('open');
        if (chevron) chevron.classList.add('open');
      }
    });
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// 10. B2B Manufacturing Blog & Factory Insights Data
const BLOG_POSTS = {
  'hoodie-manufacturers-sialkot': {
    title: 'Best Hoodie Manufacturers in Sialkot, Pakistan: The Ultimate 2026 Sourcing Guide',
    category: 'Sourcing & Industry Report',
    tag: '2026 Sourcing Guide • Rank #1',
    readTime: '8 Min Read',
    image: 'assets/images/best-hoodie-manufacturers-sialkot.jpg',
    content: `
      <div class="blog-prose space-y-5">
        <p class="text-base sm:text-lg text-slate-200 leading-relaxed font-serif italic border-l-4 border-sky-400 pl-4 py-1">
          When international fashion labels, independent streetwear brands, and fitness apparel startups look for premium manufacturing partners, one global destination consistently stands out: <strong class="text-white">Sialkot, Pakistan</strong>.
        </p>

        <p>
          Renowned for decades of textile craftsmanship, precision stitching, and competitive trade pricing, Sialkot is home to some of the world's finest garment exporters. Whether you need heavy-ounce French terry streetwear hoodies, fleece zip-ups, or performance athletic pullovers, finding the right manufacturing partner can make or break your brand.
        </p>

        <p>
          To save you months of sampling and vetting, we have curated a comprehensive list of the top hoodie manufacturers in Sialkot, Pakistan, evaluated on fabric quality, customization capabilities, minimum order quantities (MOQ), and international export reliability.
        </p>

        <!-- 1. SAZ Wearz - The Undisputed Leader -->
        <div class="my-6 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-blue-950/70 via-slate-900 to-slate-900 border-2 border-blue-500/50 shadow-2xl relative">
          <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div class="flex items-center gap-2">
              <span class="px-3 py-1 rounded-full bg-blue-600 text-white font-mono text-xs font-black uppercase tracking-wider shadow-md">
                🏆 Rank #1 &bull; Top Rated Exporter
              </span>
              <span class="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/30">
                Startup-Friendly Low MOQ
              </span>
            </div>
            <span class="text-xs font-mono text-sky-400 font-bold">2026 Audit Certified</span>
          </div>

          <h3 class="font-headline text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-3">
            1. <span class="brand-contrast">SAZ WEARZ</span> &ndash; The Undisputed Leader in Custom &amp; Private Label Hoodies
          </h3>
          
          <p class="text-slate-300 mb-5 leading-relaxed">
            At the top of our ranking stands <span class="brand-contrast">SAZ WEARZ</span>, a benchmark in premium apparel production, precision cut-and-sew manufacturing, and private-label streetwear solutions. Unlike traditional high-volume mass factories that compromise on detailing, <span class="brand-contrast">SAZ WEARZ</span> has earned an international reputation for catering seamlessly to both fast-scaling independent brands and established corporate retailers.
          </p>

          <h4 class="font-headline text-sm font-bold text-sky-300 uppercase tracking-wider mb-3">
            Why <span class="brand-contrast">SAZ WEARZ</span> Ranks #1:
          </h4>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-4 text-xs text-slate-200">
            <div class="p-3.5 rounded-xl bg-slate-900/90 border border-white/10 flex items-start gap-2.5">
              <span class="text-emerald-400 font-bold text-base leading-none mt-0.5">&#10003;</span>
              <div>
                <strong class="text-white block font-bold mb-0.5">Fabric Innovation &amp; Heavy GSM Options:</strong>
                From ultra-soft brushed fleece and micro-fleece to heavyweight 450–500+ GSM French Terry, <span class="brand-contrast">SAZ WEARZ</span> sources and mills high-grade cotton blends tailored to your exact hand-feel requirements.
              </div>
            </div>

            <div class="p-3.5 rounded-xl bg-slate-900/90 border border-white/10 flex items-start gap-2.5">
              <span class="text-emerald-400 font-bold text-base leading-none mt-0.5">&#10003;</span>
              <div>
                <strong class="text-white block font-bold mb-0.5">Full-Package Customization (OEM/ODM):</strong>
                Complete design flexibility including high-density screen printing, 3D puff prints, chenille embroidery, custom jacquard drawstrings, bespoke metal aglets, and custom woven neck tags.
              </div>
            </div>

            <div class="p-3.5 rounded-xl bg-slate-900/90 border border-white/10 flex items-start gap-2.5">
              <span class="text-emerald-400 font-bold text-base leading-none mt-0.5">&#10003;</span>
              <div>
                <strong class="text-white block font-bold mb-0.5">Startup-Friendly Low MOQ:</strong>
                Recognizing the challenges modern fashion startups face, <span class="brand-contrast">SAZ WEARZ</span> offers flexible minimum order quantities (from 30 pcs) without sacrificing manufacturing quality.
              </div>
            </div>

            <div class="p-3.5 rounded-xl bg-slate-900/90 border border-white/10 flex items-start gap-2.5">
              <span class="text-emerald-400 font-bold text-base leading-none mt-0.5">&#10003;</span>
              <div>
                <strong class="text-white block font-bold mb-0.5">Rigorous Quality Assurance (QA):</strong>
                Strict internal QC processes ensure precise measurements, consistent color fastness, pre-shrunk fabrics, and reinforced double-needle stitching on every seam.
              </div>
            </div>
          </div>

          <div class="p-3.5 rounded-xl bg-slate-900/90 border border-white/10 flex items-start gap-2.5 mb-4 text-xs text-slate-200">
            <span class="text-emerald-400 font-bold text-base leading-none mt-0.5">&#10003;</span>
            <div>
              <strong class="text-white block font-bold mb-0.5">Fast Sample Turnaround &amp; Worldwide Shipping:</strong>
              Transparent communication, rapid prototyping, and door-to-door DDP air and sea freight logistics across North America, Europe, the UK, and Australia.
            </div>
          </div>

          <div class="p-4 rounded-xl bg-blue-900/30 border border-blue-500/30 text-xs text-sky-200 font-serif italic">
            "If your priority is high-end craftsmanship, brand-ready finishing, and a partner who treats your tech pack with artistic precision, <span class="brand-contrast">SAZ WEARZ</span> is the premier choice in Sialkot."
          </div>
        </div>

        <!-- 2. Decent Sports Wear -->
        <div class="space-y-4 my-6">
          <h3 class="font-headline text-xl font-bold text-white uppercase">Additional Vetted Manufacturers in Sialkot</h3>

          <div class="p-5 rounded-xl bg-slate-900/80 border border-white/10 space-y-2">
            <div class="flex items-center justify-between">
              <h4 class="font-headline text-lg font-bold text-white uppercase">2. Decent Sports Wear</h4>
              <span class="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Mid-Tier Casuals</span>
            </div>
            <p class="text-xs sm:text-sm text-slate-300">
              Decent Sports Wear is widely recognized for its long-standing presence in casual knitwear and fleece production. They operate dedicated cut-and-sew lines capable of producing staple pullover hoodies, raglan sleeve designs, and athletic crewnecks.
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1 font-mono text-slate-300">
              <div><strong class="text-sky-400 font-bold">Best For:</strong> Mid-tier casual apparel and promotional hoodie bulk orders.</div>
              <div><strong class="text-emerald-400 font-bold">Strengths:</strong> Consistent bulk stitching, standard embroidery capabilities, and reliable regional export documentation.</div>
            </div>
          </div>

          <!-- 3. Fitrite Sports -->
          <div class="p-5 rounded-xl bg-slate-900/80 border border-white/10 space-y-2">
            <div class="flex items-center justify-between">
              <h4 class="font-headline text-lg font-bold text-white uppercase">3. Fitrite Sports</h4>
              <span class="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Athletic &amp; Gym</span>
            </div>
            <p class="text-xs sm:text-sm text-slate-300">
              Specializing in athletic wear and activewear apparel, Fitrite Sports offers moisture-wicking and blended polyester-cotton hoodie options suitable for gym brands and sports clubs.
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1 font-mono text-slate-300">
              <div><strong class="text-sky-400 font-bold">Best For:</strong> Performance fleece, track jackets, and gym training hoodies.</div>
              <div><strong class="text-emerald-400 font-bold">Strengths:</strong> Elasticity-retaining stretch blends, sublimation printing, and athletic fit patterns.</div>
            </div>
          </div>

          <!-- 4. Blue Star Garments -->
          <div class="p-5 rounded-xl bg-slate-900/80 border border-white/10 space-y-2">
            <div class="flex items-center justify-between">
              <h4 class="font-headline text-lg font-bold text-white uppercase">4. Blue Star Garments</h4>
              <span class="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Basic High-Volume</span>
            </div>
            <p class="text-xs sm:text-sm text-slate-300">
              Blue Star Garments provides standard fleece and terry solutions for clients seeking cost-effective blank garments and basic streetwear basics.
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1 font-mono text-slate-300">
              <div><strong class="text-sky-400 font-bold">Best For:</strong> Cost-conscious standard merchandise and corporate uniform supply.</div>
              <div><strong class="text-emerald-400 font-bold">Strengths:</strong> Scalable bulk capacity, standard pigment dyeing, and volume pricing.</div>
            </div>
          </div>

          <!-- 5. Silver Star Enterprises -->
          <div class="p-5 rounded-xl bg-slate-900/80 border border-white/10 space-y-2">
            <div class="flex items-center justify-between">
              <h4 class="font-headline text-lg font-bold text-white uppercase">5. Silver Star Enterprises</h4>
              <span class="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Institutional Output</span>
            </div>
            <p class="text-xs sm:text-sm text-slate-300">
              Known across Sialkot for diversified textile and sports equipment production, Silver Star handles conventional fleece wear and lifestyle apparel for large-scale procurement programs.
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1 font-mono text-slate-300">
              <div><strong class="text-sky-400 font-bold">Best For:</strong> Large bulk orders where standardized supply chain compliance is required.</div>
              <div><strong class="text-emerald-400 font-bold">Strengths:</strong> High daily output capacity and institutional export compliance.</div>
            </div>
          </div>
        </div>

        <!-- Quick Comparison Table -->
        <div class="my-8">
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-headline text-xl font-bold text-white uppercase">Quick Comparison: Choosing Your Ideal Sialkot Partner</h3>
            <span class="text-xs font-mono text-sky-400 hidden sm:inline-block">Full Sourcing Matrix</span>
          </div>
          
          <div class="overflow-x-auto rounded-2xl border border-sky-500/30 shadow-2xl">
            <table class="w-full text-left text-xs font-mono border-collapse bg-slate-900">
              <thead>
                <tr class="border-b border-white/10 text-white">
                  <th class="p-3.5 bg-slate-800/90 font-headline uppercase tracking-wider text-xs">Feature</th>
                  <th class="p-3.5 bg-blue-600/30 border-x border-blue-500/40 text-sky-300 font-headline uppercase tracking-wider text-xs"><span class="brand-contrast">SAZ WEARZ</span> (Rank #1)</th>
                  <th class="p-3.5 bg-slate-800/90 font-headline uppercase tracking-wider text-xs">Decent Sports</th>
                  <th class="p-3.5 bg-slate-800/90 font-headline uppercase tracking-wider text-xs">Fitrite Sports</th>
                  <th class="p-3.5 bg-slate-800/90 font-headline uppercase tracking-wider text-xs">Blue Star Garments</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-white/5 text-slate-300">
                <tr class="hover:bg-slate-800/40 transition-colors">
                  <td class="p-3.5 font-bold text-white">Streetwear Specialization</td>
                  <td class="p-3.5 bg-blue-950/40 border-x border-blue-500/30 text-emerald-400 font-bold">High (Custom GSM &amp; Oversized)</td>
                  <td class="p-3.5">Moderate</td>
                  <td class="p-3.5 text-slate-400">Low (Sports Focus)</td>
                  <td class="p-3.5 text-slate-400">Basic / Standard</td>
                </tr>
                <tr class="hover:bg-slate-800/40 transition-colors">
                  <td class="p-3.5 font-bold text-white">Low MOQ Friendly</td>
                  <td class="p-3.5 bg-blue-950/40 border-x border-blue-500/30 text-emerald-400 font-bold">Yes (Startup Oriented &bull; 30 pcs)</td>
                  <td class="p-3.5">Moderate</td>
                  <td class="p-3.5">Moderate</td>
                  <td class="p-3.5 text-rose-400">High Volumes</td>
                </tr>
                <tr class="hover:bg-slate-800/40 transition-colors">
                  <td class="p-3.5 font-bold text-white">Finishing &amp; Trims</td>
                  <td class="p-3.5 bg-blue-950/40 border-x border-blue-500/30 text-emerald-400 font-bold">Premium (Custom Tags, Aglets, Puff Print)</td>
                  <td class="p-3.5">Standard</td>
                  <td class="p-3.5">Standard / Sporty</td>
                  <td class="p-3.5 text-slate-400">Basic</td>
                </tr>
                <tr class="hover:bg-slate-800/40 transition-colors">
                  <td class="p-3.5 font-bold text-white">Lead Times</td>
                  <td class="p-3.5 bg-blue-950/40 border-x border-blue-500/30 text-emerald-400 font-bold">Fast &amp; Agile (Rapid Prototyping)</td>
                  <td class="p-3.5">Standard</td>
                  <td class="p-3.5">Standard</td>
                  <td class="p-3.5 text-slate-400">Varies</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Essential Sourcing Checklist -->
        <div class="my-6 p-6 sm:p-7 rounded-2xl bg-slate-900/90 border border-sky-400/30 space-y-4">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
            <h3 class="font-headline text-lg sm:text-xl font-bold text-white uppercase">Essential Sourcing Checklist for Brand Owners</h3>
          </div>
          <p class="text-xs sm:text-sm text-slate-300">
            Before finalizing your purchase order with any Pakistani manufacturer, ensure you clarify the following parameters:
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            <div class="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-1.5">
              <div class="font-headline text-xs font-bold text-sky-400 uppercase tracking-wider">1. Tech Pack Readiness</div>
              <p class="text-xs text-slate-300 leading-relaxed">Provide detailed measurements (chest width, drop shoulders, sleeve length) rather than generic sizing labels.</p>
            </div>

            <div class="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-1.5">
              <div class="font-headline text-xs font-bold text-sky-400 uppercase tracking-wider">2. Fabric Specifications</div>
              <p class="text-xs text-slate-300 leading-relaxed">Specify GSM (Grams per Square Meter), yarn composition (e.g., 100% Cotton, 80/20 CVC, or 70/30 Poly-Cotton), and finish (brushed fleece vs. loopback French terry).</p>
            </div>

            <div class="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-1.5">
              <div class="font-headline text-xs font-bold text-sky-400 uppercase tracking-wider">3. Sampling Verification</div>
              <p class="text-xs text-slate-300 leading-relaxed">Always approve a pre-production sample (PPS) to inspect print adhesion, shrink-resistance, and embroidery density before full production runs.</p>
            </div>
          </div>
        </div>

        <!-- Conclusion -->
        <div class="my-6 p-6 rounded-2xl bg-gradient-to-r from-blue-950/80 to-slate-900 border border-sky-500/40 space-y-3">
          <h3 class="font-headline text-xl font-bold text-white uppercase">Conclusion: Partner with Sialkot's Finest</h3>
          <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Sialkot offers exceptional value in global garment manufacturing, but selecting a supplier that aligns with modern aesthetic demands, premium textiles, and clear communication makes all the difference. For brands seeking unmatched build quality, modern silhouettes, and a dedicated manufacturing partner, <span class="brand-contrast">SAZ WEARZ</span> remains the clear frontrunner.
          </p>
          <div class="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <span class="text-sky-200 font-bold">Ready to launch your custom hoodie collection?</span>
            <span class="text-slate-400">Connect with <span class="brand-contrast">SAZ WEARZ</span> today to request a fabric swatch card, review digital mockups, or begin your custom sample run.</span>
          </div>
        </div>
      </div>
    `,
    takeaways: [
      'SAZ WEARZ ranks #1 in Sialkot for custom heavyweight 450–500+ GSM French Terry hoodies, bespoke trims, and startup-friendly 30-piece MOQs.',
      'Always verify PPS (Pre-Production Samples) and mandate clear tech pack tolerances before releasing bulk purchase orders.',
      'Insist on DDP (Delivered Duty Paid) shipping via DHL Express or ocean freight to ensure seamless customs clearance without hidden tariffs.'
    ],
    whatsappMsg: 'Hi Subhan & Saz Wearz Team, I read your 2026 Sourcing Guide "Best Hoodie Manufacturers in Sialkot" and would like to discuss custom hoodie manufacturing for my brand.'
  },
  'french-terry': {
    title: 'Mastering 450–500 GSM French Terry: Why Luxury Streetwear Demands Combed Cotton',
    category: 'Fabric Engineering',
    tag: 'Fabric Engineering',
    readTime: '5 Min Read',
    image: 'assets/images/streetwear-collection.jpg',
    content: `
      <p>In high-end streetwear manufacturing, fabric weight alone does not guarantee a luxury hand-feel or structured silhouette. The fundamental difference between budget heavyweight fleece and authentic luxury French Terry lies in yarn selection, loopback density, and finishing tension.</p>
      
      <h4 class="font-headline text-lg font-bold text-white uppercase pt-2">1. The Mechanics of Combed Cotton vs. Carded Yarn</h4>
      <p>Standard fleece uses carded open-end cotton yarn, which retains short, uneven fibers that pill after 2 to 3 laundry cycles. At <span class="brand-contrast">SAZ WEARZ</span>, our 450 GSM to 500 GSM loopback French Terry is exclusively spun using 100% long-staple combed cotton (20s/32s yarn counts). The combing process physically extracts all short impurities, creating a silky, mirror-smooth outer surface that is primed for high-density 3D puff screen prints and direct-to-garment (DTG) artwork.</p>
      
      <h4 class="font-headline text-lg font-bold text-white uppercase pt-2">2. Unbrushed Loopback Architecture</h4>
      <p>Unlike brushed thermal fleece—which traps excessive heat and sheds synthetic lint—luxury diagonal loopback construction features microscopic micro-loops on the interior facing. This architecture offers four-season breathability, superior moisture management, and natural structured rigidity that prevents hoodie pocket sag and collar drop.</p>
      
      <h4 class="font-headline text-lg font-bold text-white uppercase pt-2">3. Zero-Shrinkage Industrial Tumbling</h4>
      <p>Before pattern grading and precision laser cutting, every roll of French Terry undergoes continuous-feed pre-shrink tumbling at 180°C with organic enzyme softening. This guarantees less than 1.5% residual shrinkage after consumer washing, ensuring your sizing chart remains completely consistent from sampling to bulk retail drops.</p>
    `,
    takeaways: [
      'Always specify 100% combed cotton yarn (20s/32s) in your tech pack to prevent pilling and ensure razor-sharp screen prints.',
      'Unbrushed loopback architecture provides superior 4-season breathability and maintains structural boxy streetwear drape.',
      'Industrial pre-shrinking and enzyme wash tumbling eliminate consumer shrinkage surprises and sizing disputes.'
    ],
    whatsappMsg: 'Hi Subhan & Saz Wearz Team, I read your French Terry fabric guide and would like to request fabric swatches and hoodie sample costing.'
  },
  'embellishment-guide': {
    title: '3D Puff vs. High-Density Screen vs. Chenille: Which Embellishment Fits Your Tech Pack?',
    category: 'Embellishment Tech',
    tag: 'Embellishment Tech',
    readTime: '6 Min Read',
    image: 'assets/images/embroidery-craft.jpg',
    content: `
      <p>Choosing the correct tactile embellishment is one of the highest-impact design decisions for modern apparel labels. Each technique interacts uniquely with fabric GSM, weave stretch, and washing durability.</p>
      
      <h4 class="font-headline text-lg font-bold text-white uppercase pt-2">1. 3D Raised Puff Embroidery</h4>
      <p>3D Puff utilizes specialized high-density EVA foam placed beneath satin stitch columns. During computerized Tajima embroidery, our automated heads perforate the foam while encasing it under high-tensile Madeira rayon thread. The result is a sharp, architectural 3D relief with 2.5mm to 3.5mm elevation. It performs exceptionally well on heavy French Terry hoodies, snapbacks, and canvas trucker caps, but requires clean bold lettering with minimum 5mm stroke widths.</p>
      
      <h4 class="font-headline text-lg font-bold text-white uppercase pt-2">2. High-Density (HD) Plastisol Screen Print</h4>
      <p>Unlike standard screen printing which absorbs into the yarn fibers, High-Density screen printing utilizes thick capillary film stencils (up to 400 microns) combined with specialized silicone and plastisol resins. Heated in multi-stage flash cure ovens, HD print yields sharp geometric edges with a rubberized, architectural touch that will never crack under tension.</p>
      
      <h4 class="font-headline text-lg font-bold text-white uppercase pt-2">3. Chenille Towel Patches</h4>
      <p>Inspired by vintage varsity jackets and heritage sports culture, chenille utilizes looped wool-blend yarn backed by industrial felt or genuine leather trim. At <span class="brand-contrast">SAZ WEARZ</span>, our multi-needle chenille machines produce tight loop density that withstands dry cleaning and heavy wear, making it the gold standard for luxury letterman jackets and oversized statement hoodies.</p>
    `,
    takeaways: [
      'For 3D puff embroidery, keep artwork stroke widths at 5mm+ and avoid hyper-fine serif details to prevent foam bleed.',
      'High-Density screen print is ideal for minimalist technical streetwear logos requiring razor-sharp 90-degree tactile edges.',
      'Chenille patches demand 380+ GSM garments or wool/leather outerwear shells to support the physical weight of felt backing.'
    ],
    whatsappMsg: 'Hi Subhan & Saz Wearz Team, I read your Embellishment Guide and would like to test 3D puff and chenille samples on our brand designs.'
  },
  'ddp-logistics': {
    title: 'Sialkot to Global Doorstep: Navigating DDP Air & Ocean Freight for Low MOQ Brands',
    category: 'Global Logistics',
    tag: 'Global Logistics',
    readTime: '4 Min Read',
    image: 'assets/images/packaging-branding.jpg',
    content: `
      <p>One of the most intimidating hurdles for emerging clothing brands is navigating international customs clearance, HS tariff codes, and unpredictable import brokerage charges. Understanding the difference between FOB, CIF, and DDP shipping is essential for protecting profit margins.</p>
      
      <h4 class="font-headline text-lg font-bold text-white uppercase pt-2">1. What is DDP (Delivered Duty Paid)?</h4>
      <p>Under DDP terms, <span class="brand-contrast">SAZ WEARZ</span> handles 100% of export declarations in Pakistan, international transit, air cargo freight charges, destination customs inspection, import tariffs, and final mile courier dispatch right to your commercial warehouse or home doorstep. You pay one inclusive landed cost with zero surprise invoices upon delivery.</p>
      
      <h4 class="font-headline text-lg font-bold text-white uppercase pt-2">2. Express Air vs. Consolidated Ocean Freight</h4>
      <p>For sample prototyping and small batch drops (30 to 150 pieces), our direct accounts with DHL Express and FedEx Priority deliver transit times of 3 to 5 business days from Sialkot International Airport to New York, Los Angeles, London, and Frankfurt. For replenishment inventory scaling over 300 to 500 units, consolidated ocean freight via Karachi Port reduces per-unit shipping expenses by up to 60%.</p>
      
      <h4 class="font-headline text-lg font-bold text-white uppercase pt-2">3. Automated Tracking & Customs Documentation</h4>
      <p>Every shipment is accompanied by commercial export invoices, certificates of origin, and real-time live GPS tracking links sent directly to your WhatsApp and email dispatch notification.</p>
    `,
    takeaways: [
      'Always request DDP (Delivered Duty Paid) shipping to avoid surprise brokerage fees and customs clearance headaches.',
      'DHL Express Air (3–5 business days) is the fastest, safest method for drops under 150 pieces and urgent pre-orders.',
      'Ocean freight provides significant shipping margin savings once bulk order volumes surpass 300 pieces per style.'
    ],
    whatsappMsg: 'Hi Subhan & Saz Wearz Team, I read your DDP Logistics Guide and would like to get a DDP air freight quotation to my country.'
  }
};

window.openBlogModal = function(postId) {
  const post = BLOG_POSTS[postId];
  if (!post) return;

  const modal = document.getElementById('blog-modal');
  const catEl = document.getElementById('blog-modal-category');
  const tagEl = document.getElementById('blog-modal-tag');
  const timeEl = document.getElementById('blog-modal-time');
  const titleEl = document.getElementById('blog-modal-title');
  const imgEl = document.getElementById('blog-modal-img');
  const contentEl = document.getElementById('blog-modal-content');
  const takeawaysEl = document.getElementById('blog-modal-takeaways');
  const waBtn = document.getElementById('blog-modal-whatsapp');

  if (catEl) catEl.textContent = post.category;
  if (tagEl) tagEl.textContent = post.tag;
  if (timeEl) timeEl.textContent = post.readTime;
  if (titleEl) titleEl.textContent = post.title;
  if (imgEl) {
    imgEl.src = post.image;
    imgEl.alt = post.title;
  }
  if (contentEl) contentEl.innerHTML = post.content;
  if (takeawaysEl) {
    takeawaysEl.innerHTML = post.takeaways
      .map(t => `<li class="flex items-start gap-2 text-slate-300"><span class="text-sky-400 font-bold shrink-0 mt-0.5">&bull;</span><span>${t}</span></li>`)
      .join('');
  }
  if (waBtn) {
    const encoded = encodeURIComponent(post.whatsappMsg);
    waBtn.href = `https://wa.me/923010850746?text=${encoded}`;
  }

  if (modal) {
    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    const cardContainer = modal.querySelector('.navy-card');
    if (cardContainer) cardContainer.scrollTop = 0;
  }
};

window.closeBlogModal = function() {
  const modal = document.getElementById('blog-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
};

window.quoteFromBlogModal = function() {
  closeBlogModal();
  const quoteSec = document.getElementById('quote');
  if (quoteSec) {
    quoteSec.scrollIntoView({ behavior: 'smooth' });
  }
};

function initBlogModal() {
  const modal = document.getElementById('blog-modal');
  if (!modal) return;

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeBlogModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeBlogModal();
    }
  });
}

