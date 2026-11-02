// Bike Logbook: Urdu translation.
// The app is written in English. When Urdu is chosen, this file translates
// every piece of text on screen as it appears (and restores the English when
// switched back). Numbers, km, Rs and dates' digits stay as they are.
(function () {
  "use strict";
  const KEY = "bike-logbook-lang";

  // Whole phrases (a text node or a placeholder / title that equals one of these)
  const EXACT = {
    // header, gate, top
    "Maintenance logbook": "مینٹیننس ریکارڈ",
    "Fuel, oil changes, service and tuning in one place": "پیٹرول، آئل چینج، سروس اور ٹیوننگ — سب ایک جگہ",
    "Charging, check-ups and parts in one place": "چارجنگ، چیک اپ اور پرزے — سب ایک جگہ",
    "Fuel, oil changes, tuning and parts for every bike in the family, saved to your Google account and shared with the people who ride it.": "گھر کی ہر بائیک کا پیٹرول، آئل چینج، ٹیوننگ اور پرزوں کا ریکارڈ — آپ کے گوگل اکاؤنٹ میں محفوظ، اور بائیک چلانے والوں کے ساتھ شیئر۔",
    "Sign in with Google": "گوگل سے سائن ان کریں",
    "Use without an account (this phone only)": "اکاؤنٹ کے بغیر استعمال کریں (صرف اس فون پر)",
    "Showing · tap to change": "منتخب بائیک · بدلنے کے لیے ٹیپ کریں",
    "+ Add another bike": "+ ایک اور بائیک شامل کریں",
    "My Bike": "میری بائیک",
    "Odometer": "میٹر ریڈنگ",
    "km": "کلومیٹر",
    "km/L": "کلومیٹر فی لیٹر",
    "km left": "کلومیٹر باقی",
    "Overdue": "وقت گزر گیا",
    "Auto": "خودکار",
    "Light": "لائٹ",
    "Dark": "ڈارک",
    "Change light or dark mode": "لائٹ یا ڈارک موڈ بدلیں",
    "Following your phone's setting. Tap to change.": "فون کی سیٹنگ کے مطابق۔ بدلنے کے لیے ٹیپ کریں۔",
    "Light mode. Tap to change.": "لائٹ موڈ۔ بدلنے کے لیے ٹیپ کریں۔",
    "Dark mode. Tap to change.": "ڈارک موڈ۔ بدلنے کے لیے ٹیپ کریں۔",
    "Change language": "زبان بدلیں",
    "Bike status": "بائیک کی حالت",
    "Current odometer": "موجودہ میٹر ریڈنگ",

    // gauges
    "Next oil change": "اگلا آئل چینج",
    "Next tuning": "اگلی ٹیوننگ",
    "Fuel average": "ایوریج",
    "Spent this month": "اس مہینے کا خرچ",
    "Next check-up": "اگلا چیک اپ",
    "Battery health": "بیٹری کی صحت",
    "Range per full charge": "فل چارج پر رینج",
    "Log an oil change to start the countdown": "الٹی گنتی شروع کرنے کے لیے آئل چینج درج کریں",
    "Log a tuning to start the countdown": "الٹی گنتی شروع کرنے کے لیے ٹیوننگ درج کریں",
    "Log a service to start the countdown": "الٹی گنتی شروع کرنے کے لیے سروس درج کریں",
    "Needs two full-tank fills": "دو بار ٹینکی فل کروانے کے بعد نظر آئے گا",
    "Needs two charges with battery %": "بیٹری % کے ساتھ دو چارج درج ہونے کے بعد نظر آئے گا",
    "Measured from your charging history": "آپ کے چارجنگ ریکارڈ سے حساب لگایا جاتا ہے",
    "% of its range when new": "% نئی حالت کی رینج کا",
    "Running cost per km appears after a few entries": "چند اندراجات کے بعد فی کلومیٹر خرچ نظر آئے گا",

    // entry form
    "Add entry": "نیا اندراج",
    "Edit entry": "اندراج میں ترمیم",
    "Fuel": "پیٹرول",
    "Oil": "آئل",
    "Oil change": "آئل چینج",
    "Service": "سروس",
    "Tuning": "ٹیوننگ",
    "Parts": "پرزے",
    "Part": "پرزہ",
    "Charge": "چارج",
    "Date": "تاریخ",
    "Odometer (km)": "میٹر ریڈنگ (کلومیٹر)",
    "Litres filled": "کتنے لیٹر ڈلوائے",
    "Price per litre": "فی لیٹر قیمت",
    "Filled to full tank (needed for the average)": "ٹینکی فل کروائی (ایوریج کے لیے ضروری)",
    "Battery % before charging": "چارج سے پہلے بیٹری %",
    "Battery % after charging": "چارج کے بعد بیٹری %",
    "Charged at": "کہاں چارج کیا",
    "Home": "گھر",
    "Charging station": "چارجنگ اسٹیشن",
    "Note the % when you plug in, and the % when you unplug.": "پلگ لگاتے وقت اور نکالتے وقت بیٹری % نوٹ کریں۔",
    "Enter what the station charged you.": "اسٹیشن نے جتنے پیسے لیے وہ لکھیں۔",
    "Oil brand and grade": "آئل کا برانڈ اور گریڈ",
    "Work done": "کیا کام ہوا",
    "Part replaced": "کون سا پرزہ بدلا",
    "Brand / type": "برانڈ / قسم",
    "Part name": "پرزے کا نام",
    "Expected life (km)": "متوقع عمر (کلومیٹر)",
    "Expected life (months)": "متوقع عمر (مہینے)",
    "What was done": "کیا کام ہوا",
    "Carburetor": "کاربوریٹر",
    "Spark plug": "پلگ",
    "Air filter": "ایئر فلٹر",
    "Tappets": "ٹیپٹ",
    "Idle / mixture": "آئیڈل / مکسچر",
    "Chain": "چین",
    "+ Other": "+ کچھ اور",
    "What else was done? Separate items with commas": "اور کیا کام ہوا؟ ہر کام کو کومے سے الگ کریں",
    "Workshop / mechanic": "ورکشاپ / مستری",
    "Total cost": "کل خرچ",
    "Notes": "نوٹس",
    "Save entry": "اندراج محفوظ کریں",
    "Save fuel": "پیٹرول محفوظ کریں",
    "Save oil change": "آئل چینج محفوظ کریں",
    "Save service": "سروس محفوظ کریں",
    "Save tuning": "ٹیوننگ محفوظ کریں",
    "Save part": "پرزہ محفوظ کریں",
    "Save charge": "چارج محفوظ کریں",
    "Save changes": "تبدیلیاں محفوظ کریں",
    "Cancel edit": "ترمیم منسوخ کریں",
    "Anything to remember next time": "اگلی بار کے لیے کوئی یاد رکھنے والی بات",
    "optional": "اختیاری",
    "Fuel saved.": "پیٹرول کا اندراج محفوظ ہو گیا۔",
    "Oil change saved.": "آئل چینج محفوظ ہو گیا۔",
    "Service saved.": "سروس محفوظ ہو گئی۔",
    "Tuning saved.": "ٹیوننگ محفوظ ہو گئی۔",
    "Part saved.": "پرزہ محفوظ ہو گیا۔",
    "Charge saved.": "چارج محفوظ ہو گیا۔",
    "Changes saved.": "تبدیلیاں محفوظ ہو گئیں۔",
    "Pick the date of this entry.": "اس اندراج کی تاریخ چنیں۔",
    "Enter the odometer reading in km.": "میٹر ریڈنگ کلومیٹر میں لکھیں۔",
    "Enter how many litres you filled.": "کتنے لیٹر پیٹرول ڈلوایا، یہ لکھیں۔",
    "Enter the battery % before charging (what it showed when you plugged in).": "چارج سے پہلے کی بیٹری % لکھیں (پلگ لگاتے وقت جتنی تھی)۔",
    "Battery % after charging should be higher than before, and no more than 100.": "چارج کے بعد کی بیٹری % پہلے سے زیادہ اور 100 سے کم یا برابر ہونی چاہیے۔",
    "Describe the work done.": "جو کام ہوا وہ لکھیں۔",
    "Name the part you replaced.": "جو پرزہ بدلا اس کا نام لکھیں۔",
    "Type what else was done, or untick Other.": "اور کیا کام ہوا وہ لکھیں، یا \"کچھ اور\" سے نشان ہٹا دیں۔",
    "Add a bike first (in My bikes below), then log entries for it.": "پہلے نیچے \"میری بائیکس\" میں بائیک شامل کریں، پھر اندراج کریں۔",
    "Couldn't save. Check your connection and try again.": "محفوظ نہیں ہو سکا۔ انٹرنیٹ چیک کر کے دوبارہ کوشش کریں۔",

    // parts
    "Battery pack": "بیٹری پیک",
    "Drive belt": "ڈرائیو بیلٹ",
    "Sprocket set": "اسپراکٹ سیٹ",
    "Front tyre": "اگلا ٹائر",
    "Rear tyre": "پچھلا ٹائر",
    "Front brake shoes/pads": "اگلے بریک شو / پیڈ",
    "Rear brake shoes": "پچھلے بریک شو",
    "Clutch plates": "کلچ پلیٹس",
    "Battery": "بیٹری",
    "Charger": "چارجر",
    "Controller": "کنٹرولر",
    "Motor bearings": "موٹر کے بیئرنگ",
    "Throttle": "ریس (تھروٹل)",
    "Other part": "کوئی اور پرزہ",
    "Parts life": "پرزوں کی عمر",
    "Set expected life": "متوقع عمر لکھیں",
    "Change life": "عمر بدلیں",
    "Due now": "اب بدلنا ہے",

    // spending
    "Spending": "خرچہ",
    "This month": "اس مہینے",
    "Last month": "پچھلے مہینے",
    "Last 3 months": "پچھلے 3 مہینے",
    "Last 6 months": "پچھلے 6 مہینے",
    "Choose dates…": "تاریخیں چنیں…",
    "From": "سے",
    "To": "تک",
    "Whole period": "پورا عرصہ",
    "Spending period": "خرچ کا عرصہ",
    "Spending by period. Tap a bar for its breakdown.": "عرصے کے حساب سے خرچ۔ تفصیل کے لیے بار پر ٹیپ کریں۔",
    "Tap the bar again to see the whole period.": "پورا عرصہ دیکھنے کے لیے بار پر دوبارہ ٹیپ کریں۔",
    "Tap a bar to see that month on its own.": "صرف اس مہینے کو دیکھنے کے لیے بار پر ٹیپ کریں۔",
    "Tap a bar to see that week on its own.": "صرف اس ہفتے کو دیکھنے کے لیے بار پر ٹیپ کریں۔",
    "No spending in this period.": "اس عرصے میں کوئی خرچ نہیں۔",
    "No spending logged for these dates.": "ان تاریخوں میں کوئی خرچ درج نہیں۔",

    // history
    "History": "ریکارڈ",
    "All": "سب",
    "Deleted": "حذف شدہ",
    "Edit": "ترمیم",
    "Delete": "حذف کریں",
    "Tap again to delete": "حذف کرنے کے لیے دوبارہ ٹیپ کریں",
    "Undo last edit": "آخری ترمیم واپس لیں",
    "Tap again to undo": "واپس لینے کے لیے دوبارہ ٹیپ کریں",
    "Restore": "بحال کریں",
    "Delete forever": "ہمیشہ کے لیے حذف کریں",
    "Tap again: can't be undone": "دوبارہ ٹیپ کریں: یہ واپس نہیں ہو گا",
    "No entries yet": "ابھی کوئی اندراج نہیں",
    "Add your first fill-up or oil change on the left. Your odometer, reminders and fuel average fill in as you go.": "پہلا پیٹرول یا آئل چینج درج کریں۔ میٹر ریڈنگ، یاد دہانیاں اور ایوریج ساتھ ساتھ بنتے جائیں گے۔",
    "Log your first charge on the left. Your odometer, range and reminders fill in as you go.": "پہلا چارج درج کریں۔ میٹر ریڈنگ، رینج اور یاد دہانیاں ساتھ ساتھ بنتی جائیں گی۔",
    "Nothing deleted. When an entry is deleted it waits here, so it can be restored.": "کچھ حذف نہیں ہوا۔ حذف کیا گیا اندراج یہاں رہتا ہے تاکہ بحال کیا جا سکے۔",
    "Deleted entries stay here until the bike's owner or the person who added them deletes them for good. Anyone can restore them.": "حذف شدہ اندراجات یہاں رہتے ہیں جب تک بائیک کا مالک یا اندراج کرنے والا انہیں ہمیشہ کے لیے حذف نہ کرے۔ کوئی بھی انہیں بحال کر سکتا ہے۔",
    "Example": "مثال",
    "You're looking at": "آپ دیکھ رہے ہیں",
    "example entries": "مثالی اندراجات",
    ". Add your own, then remove these.": "۔ اپنے اندراجات کریں، پھر انہیں ہٹا دیں۔",
    "Remove examples": "مثالیں ہٹائیں",
    "Entry deleted. You can restore it from Deleted.": "اندراج حذف ہو گیا۔ آپ اسے \"حذف شدہ\" سے بحال کر سکتے ہیں۔",
    "Undo": "واپس",
    "Redo": "دوبارہ",
    "Couldn't delete. Only the bike's owner or the person who added it can delete an entry.": "حذف نہیں ہو سکا۔ صرف بائیک کا مالک یا اندراج کرنے والا ہی اسے حذف کر سکتا ہے۔",
    "Edit undone. The entry is back to how it was before.": "ترمیم واپس ہو گئی۔ اندراج پہلے جیسا ہو گیا۔",
    "Entry restored.": "اندراج بحال ہو گیا۔",
    "Entry permanently deleted.": "اندراج ہمیشہ کے لیے حذف ہو گیا۔",
    "Couldn't delete it permanently.": "ہمیشہ کے لیے حذف نہیں ہو سکا۔",

    // bikes
    "My bikes": "میری بائیکس",
    "+ Add new bike": "+ نئی بائیک شامل کریں",
    "Add a bike": "بائیک شامل کریں",
    "Edit bike": "بائیک میں ترمیم",
    "Type of bike": "بائیک کی قسم",
    "Petrol": "پیٹرول",
    "Electric": "الیکٹرک",
    "⚡ Electric": "⚡ الیکٹرک",
    "Model": "ماڈل",
    "Choose a model…": "ماڈل چنیں…",
    "Other / not listed": "کوئی اور / فہرست میں نہیں",
    "Type the make and model": "کمپنی اور ماڈل لکھیں",
    "Bike name": "بائیک کا نام",
    "(optional)": "(اختیاری)",
    "Currency label": "کرنسی",
    "Pick the model, then give it your own name if you like. Electric bikes log charging instead of fuel, oil and tuning.": "ماڈل چنیں، پھر چاہیں تو اپنا نام دیں۔ الیکٹرک بائیک میں پیٹرول، آئل اور ٹیوننگ کی جگہ چارجنگ درج ہوتی ہے۔",
    "Current odometer (km)": "موجودہ میٹر ریڈنگ (کلومیٹر)",
    "Odometer when added (km)": "شامل کرتے وقت میٹر ریڈنگ (کلومیٹر)",
    "What the meter shows today. Leave blank for a new bike.": "آج میٹر جو دکھا رہا ہے۔ نئی بائیک کے لیے خالی چھوڑ دیں۔",
    "The reading you started the logbook from. New entries keep the odometer up to date.": "جس ریڈنگ سے ریکارڈ شروع کیا۔ نئے اندراجات سے میٹر ریڈنگ خود اپ ڈیٹ ہوتی رہتی ہے۔",
    "Oil change every (km)": "ہر کتنے کلومیٹر پر آئل چینج",
    "Tuning every (km)": "ہر کتنے کلومیٹر پر ٹیوننگ",
    "…or every (months), whichever first": "…یا ہر کتنے مہینے بعد، جو پہلے آئے",
    "Battery size (kWh)": "بیٹری کا سائز (kWh)",
    "Electricity rate (Rs per unit)": "بجلی کا ریٹ (روپے فی یونٹ)",
    "…or battery volts": "…یا بیٹری کے وولٹ",
    "and amp-hours (Ah)": "اور ایمپیئر آور (Ah)",
    "Written on the battery sticker. Volts × Ah fills in the kWh for you (60V × 32Ah = 1.92 kWh).": "یہ بیٹری کے اسٹیکر پر لکھا ہوتا ہے۔ وولٹ × Ah سے kWh خود بھر جاتا ہے (60V × 32Ah = 1.92 kWh)۔",
    "Check-up every (km)": "ہر کتنے کلومیٹر پر چیک اپ",
    "…or every (months)": "…یا ہر کتنے مہینے بعد",
    "Share this bike with": "یہ بائیک کس کے ساتھ شیئر کریں",
    "Save bike": "بائیک محفوظ کریں",
    "Cancel": "منسوخ",
    "Open": "کھولیں",
    "Showing now": "ابھی منتخب",
    "Bike saved.": "بائیک محفوظ ہو گئی۔",
    "Bike deleted.": "بائیک حذف ہو گئی۔",
    "Choose the bike's model, or type a name for it.": "بائیک کا ماڈل چنیں، یا اس کا نام لکھیں۔",
    "Type the make and model, for example Honda CD 70.": "کمپنی اور ماڈل لکھیں، مثلاً Honda CD 70۔",
    "Couldn't save the bike. Only the bike's owner can change it.": "بائیک محفوظ نہیں ہو سکی۔ صرف بائیک کا مالک اسے بدل سکتا ہے۔",
    "Couldn't save. Your phone storage may be full.": "محفوظ نہیں ہو سکا۔ شاید فون کی میموری بھر گئی ہے۔",
    "Add your bike to start: its name and what the odometer shows today.": "شروع کرنے کے لیے اپنی بائیک شامل کریں: اس کا ماڈل اور آج کی میٹر ریڈنگ۔",
    "No bikes yet. Tap": "ابھی کوئی بائیک نہیں۔",
    "to start.": "پر ٹیپ کر کے شروع کریں۔",
    "Tap again to delete ": "حذف کرنے کے لیے دوبارہ ٹیپ کریں",
    "We don't have battery figures for this model yet. They're on the battery sticker or in the bike's papers.": "اس ماڈل کی بیٹری کی معلومات ابھی ہمارے پاس نہیں۔ یہ بیٹری کے اسٹیکر یا بائیک کے کاغذات پر ملیں گی۔",

    // family
    "Family & sharing": "فیملی اور شیئرنگ",
    "Sign in with Google to save your bikes online and share them with your family, so everyone can add fuel and maintenance from their own phone.": "گوگل سے سائن ان کریں تاکہ بائیکس آن لائن محفوظ ہوں اور فیملی کے ساتھ شیئر ہوں — ہر کوئی اپنے فون سے پیٹرول اور مرمت درج کر سکے۔",
    "Sign in to share": "شیئر کرنے کے لیے سائن ان کریں",
    "New group name": "نئے گروپ کا نام",
    "Create group": "گروپ بنائیں",
    "Family": "فیملی",
    "e.g. Cousins": "مثلاً کزنز",
    "Invite someone": "کسی کو دعوت دیں",
    "Leave group": "گروپ چھوڑیں",
    "Tap again to leave": "چھوڑنے کے لیے دوبارہ ٹیپ کریں",
    "Send this link. They open it, sign in with Google, and they're in.": "یہ لنک بھیجیں۔ وہ اسے کھولیں، گوگل سے سائن ان کریں، اور گروپ میں شامل ہو جائیں۔",
    "Copy link": "لنک کاپی کریں",
    "Send on WhatsApp": "واٹس ایپ پر بھیجیں",
    "Invite link": "دعوت کا لنک",
    "You": "آپ",
    "Remove?": "ہٹائیں؟",
    "Create a group (for example": "ایک گروپ بنائیں (مثلاً",
    "), invite your family with a link, then tick the group on any bike you want to share. Everyone in the group can add fuel and maintenance from their own phone.": ")، فیملی کو لنک سے دعوت دیں، پھر جو بائیک شیئر کرنی ہو اس پر گروپ کا نشان لگائیں۔ گروپ کا ہر فرد اپنے فون سے پیٹرول اور مرمت درج کر سکتا ہے۔",
    "Give the group a name.": "گروپ کا نام لکھیں۔",
    "You're offline. Creating a group needs internet.": "آپ آف لائن ہیں۔ گروپ بنانے کے لیے انٹرنیٹ چاہیے۔",
    "Couldn't create the group. Check your internet and try again.": "گروپ نہیں بن سکا۔ انٹرنیٹ چیک کر کے دوبارہ کوشش کریں۔",
    "Invite link copied. Paste it in WhatsApp or a text message.": "دعوت کا لنک کاپی ہو گیا۔ اسے واٹس ایپ یا میسج میں پیسٹ کریں۔",
    "Link selected. Copy it from the box.": "لنک منتخب ہو گیا۔ باکس سے کاپی کر لیں۔",
    "You left the group.": "آپ نے گروپ چھوڑ دیا۔",
    "Couldn't leave the group. Check your internet.": "گروپ نہیں چھوڑا جا سکا۔ انٹرنیٹ چیک کریں۔",
    "Removed from the group.": "گروپ سے ہٹا دیا گیا۔",
    "Couldn't remove them. Check your internet.": "ہٹایا نہیں جا سکا۔ انٹرنیٹ چیک کریں۔",

    // backup & account
    "Backup & restore": "بیک اپ اور بحالی",
    "Entries live on this phone. Save a backup file to keep them safe, or to move them to a new phone.": "اندراجات اسی فون پر محفوظ ہیں۔ انہیں محفوظ رکھنے یا نئے فون پر لے جانے کے لیے بیک اپ فائل بنائیں۔",
    "Backup now": "ابھی بیک اپ کریں",
    "Restore from file": "فائل سے بحال کریں",
    "Loading your logbook…": "آپ کا ریکارڈ لوڈ ہو رہا ہے…",
    "Your entries are saved on this phone only. Tap Backup now and then to keep a safe copy.": "آپ کے اندراجات صرف اس فون پر محفوظ ہیں۔ وقتاً فوقتاً \"ابھی بیک اپ کریں\" دبا کر کاپی محفوظ کر لیں۔",
    "Saved to your Google account. Works offline too: entries upload when you're back online.": "آپ کے گوگل اکاؤنٹ میں محفوظ۔ انٹرنیٹ کے بغیر بھی چلتا ہے: انٹرنیٹ آنے پر اندراجات اپ لوڈ ہو جاتے ہیں۔",
    "Download a copy": "کاپی ڈاؤن لوڈ کریں",
    "Sign out": "سائن آؤٹ",
    "Copy saved to your Downloads folder.": "کاپی آپ کے ڈاؤن لوڈز فولڈر میں محفوظ ہو گئی۔",
    "That file isn't a Bike Logbook backup. Pick the .json file you saved with Backup now.": "یہ بائیک لاگ بک کی بیک اپ فائل نہیں۔ وہ ‎.json فائل چنیں جو آپ نے بیک اپ سے بنائی تھی۔",
    "Sign-in was closed before it finished. Tap the button to try again.": "سائن ان مکمل ہونے سے پہلے بند ہو گیا۔ دوبارہ کوشش کے لیے بٹن دبائیں۔",
    "Couldn't sign in. Tap the button to try again.": "سائن ان نہیں ہو سکا۔ دوبارہ کوشش کے لیے بٹن دبائیں۔",
    "You're offline. Connect to the internet to sign in.": "آپ آف لائن ہیں۔ سائن ان کے لیے انٹرنیٹ سے جڑیں۔",
    "That invite link didn't work. Ask for a new one.": "یہ دعوت کا لنک کام نہیں کر رہا۔ نیا لنک منگوائیں۔",
    "You're offline. We'll join the group when you're back online.": "آپ آف لائن ہیں۔ انٹرنیٹ آتے ہی گروپ میں شامل کر دیا جائے گا۔",

    // battery figure notes
    "An older Sharp version had a 72V 28Ah battery.": "Sharp کے ایک پرانے ورژن میں 72V 28Ah بیٹری تھی۔",
    "Some listings show a 72V 35Ah version.": "کچھ جگہوں پر 72V 35Ah ورژن بھی لکھا ہے۔",
    "A 76V 32Ah version also exists.": "اس کا 76V 32Ah ورژن بھی ہے۔",
    "Log a part replacement (tyres, brakes, chain, battery…) under": "پرزہ بدلنے کا اندراج (ٹائر، بریک، چین، بیٹری…)",
    "and its wear shows here.": "میں کریں، اس کی گھسائی یہاں نظر آئے گی۔",
    "e.g. Brake shoes replaced, chain tightened": "مثلاً بریک شو بدلے، چین ٹائٹ کی",
    "e.g. Clutch cable": "مثلاً کلچ کی تار",
    "e.g. Clutch cable adjusted, new fuel pipe": "مثلاً کلچ کی تار سیٹ کی، نیا فیول پائپ",
    "e.g. Abu's Pridor": "مثلاً ابو کی پرائیڈر",
    "e.g. Shell Advance 20W-50, 1 L": "مثلاً Shell Advance 20W-50، 1 لیٹر",
    "+ Add another part": "+ ایک اور پرزہ شامل کریں",
    "Phone reminders": "فون پر یاد دہانیاں",
    "Turn on reminders": "یاد دہانیاں آن کریں",
    "Shops": "دکانیں",
    "You scanned this shop's code": "آپ نے اس دکان کا کوڈ اسکین کیا",
    "Let this shop add jobs to my bike": "اس دکان کو میری بائیک پر کام درج کرنے دیں",
    "Add a visit at this shop": "اس دکان کا وزٹ درج کریں",
    "My mechanics": "میرے مستری",
    "Scan your mechanic's Bike Log QR code with your phone camera to save his shop here.": "اپنے مستری کا بائیک لاگ QR کوڈ فون کے کیمرے سے اسکین کریں تاکہ اس کی دکان یہاں محفوظ ہو جائے۔",
    "Search on Google Maps": "گوگل میپس پر تلاش کریں",
    "My shop": "میری دکان",
    "Do you run a bike workshop or parts shop? Set it up here. Customers scan your QR code to save your shop in their app, and their reminders bring them back to you.": "کیا آپ کی بائیک ورکشاپ یا پارٹس کی دکان ہے؟ اسے یہاں بنائیں۔ گاہک آپ کا QR کوڈ اسکین کر کے آپ کی دکان اپنی ایپ میں محفوظ کریں گے، اور ان کی یاد دہانیاں انہیں دوبارہ آپ کے پاس لائیں گی۔",
    "Set up my shop": "میری دکان بنائیں",
    "Shop name": "دکان کا نام",
    "Owner or mechanic name": "مالک یا مستری کا نام",
    "Area / market": "علاقہ / مارکیٹ",
    "City": "شہر",
    "WhatsApp number": "واٹس ایپ نمبر",
    "What do you do?": "آپ کیا کام کرتے ہیں؟",
    "I repair bikes": "میں بائیک ٹھیک کرتا ہوں",
    "I sell parts": "میں پارٹس بیچتا ہوں",
    "I keep some parts in stock": "میرے پاس کچھ پارٹس اسٹاک میں ہیں",
    "Services": "سروسز",
    "Electric bikes": "الیکٹرک بائیکس",
    "Puncture": "پنکچر",
    "Engine work": "انجن کا کام",
    "Denting & painting": "ڈینٹنگ اور پینٹنگ",
    "Shop location": "دکان کا مقام",
    "Use my current location": "میرا موجودہ مقام استعمال کریں",
    "Stand inside your shop and tap this, so customers can find you on the map.": "اپنی دکان کے اندر کھڑے ہو کر یہ دبائیں، تاکہ گاہک آپ کو نقشے پر ڈھونڈ سکیں۔",
    "Save shop": "دکان محفوظ کریں",
    "Location saved.": "مقام محفوظ ہو گیا۔",
    "Finding your location…": "آپ کا مقام تلاش ہو رہا ہے…",
    "This phone can't share its location.": "یہ فون اپنا مقام نہیں بتا سکتا۔",
    "Couldn't get the location. Allow location for Bike Log and try again, or skip it.": "مقام نہیں مل سکا۔ بائیک لاگ کو لوکیشن کی اجازت دے کر دوبارہ کوشش کریں، یا اسے چھوڑ دیں۔",
    "Type your shop's name.": "اپنی دکان کا نام لکھیں۔",
    "Shop saved. Now print your QR code.": "دکان محفوظ ہو گئی۔ اب اپنا QR کوڈ پرنٹ کریں۔",
    "Shop updated.": "دکان اپ ڈیٹ ہو گئی۔",
    "Couldn't save the shop. Please try again.": "دکان محفوظ نہیں ہو سکی۔ دوبارہ کوشش کریں۔",
    "You're offline. Saving the shop needs internet.": "آپ آف لائن ہیں۔ دکان محفوظ کرنے کے لیے انٹرنیٹ چاہیے۔",
    "Show my QR code": "میرا QR کوڈ دکھائیں",
    "Edit shop": "دکان میں تبدیلی کریں",
    "Print the QR poster and put it where customers wait. Coming next: add jobs and bills for your customers' bikes.": "QR پوسٹر پرنٹ کر کے وہاں لگائیں جہاں گاہک انتظار کرتے ہیں۔ اگلا مرحلہ: گاہکوں کی بائیکس کے کام اور بل درج کریں۔",
    "Sign in with Google to set up your shop.": "اپنی دکان بنانے کے لیے گوگل سے سائن ان کریں۔",
    "Print poster": "پوسٹر پرنٹ کریں",
    "Send link on WhatsApp": "واٹس ایپ پر لنک بھیجیں",
    "Add visit here": "یہاں کا وزٹ درج کریں",
    "Call": "کال کریں",
    "WhatsApp": "واٹس ایپ",
    "Map": "نقشہ",
    "Shop filled in. Choose what was done and save.": "دکان کا نام لکھ دیا گیا۔ جو کام ہوا وہ چنیں اور محفوظ کریں۔",
    "That shop code wasn't found.": "اس دکان کا کوڈ نہیں ملا۔",
    "Couldn't make the QR code. Try again.": "QR کوڈ نہیں بن سکا۔ دوبارہ کوشش کریں۔",
    "Connect to the internet once to make the QR code.": "QR کوڈ بنانے کے لیے ایک بار انٹرنیٹ سے جڑیں۔",
    "e.g. Akram Autos": "مثلاً اکرم آٹوز",
    "e.g. Ustad Akram": "مثلاً استاد اکرم",
    "e.g. Gulberg": "مثلاً گلبرگ",
    "e.g. Lahore": "مثلاً لاہور",
    "More": "مزید",
    "Settings": "سیٹنگز",
    "Shops & mechanics": "دکانیں اور مستری",
    "Coming soon: scan your mechanic's QR code to save his shop on your entries, and see all your mechanics here.": "جلد آ رہا ہے: اپنے مستری کا QR کوڈ اسکین کریں تاکہ اس کی دکان آپ کے اندراج میں محفوظ ہو، اور اپنے سب مستری یہاں دیکھیں۔",
    "Find bike mechanics near me": "قریب ترین بائیک مستری تلاش کریں",
    "Find petrol pumps near me": "قریب ترین پیٹرول پمپ تلاش کریں",
    "Opens Google Maps near your location.": "آپ کے مقام کے قریب گوگل میپس کھلے گا۔",
    "Light or dark mode": "لائٹ یا ڈارک موڈ",
    "Get a reminder when your next oil change or tuning is due?": "اگلا آئل چینج یا ٹیوننگ آنے پر یاد دہانی چاہیے؟",
    "Bike Log can send a notification to this phone when it's time, with the last reading, date and shop.": "وقت آنے پر Bike Log اس فون پر اطلاع بھیج سکتا ہے، پچھلی ریڈنگ، تاریخ اور دکان کے ساتھ۔",
    "Turn off reminders": "یاد دہانیاں بند کریں",
    "Get a notification on this phone when an oil change, tuning or check-up is coming up, and a reminder to update your odometer reading.": "جب آئل چینج، ٹیوننگ یا چیک اپ کا وقت قریب ہو تو اس فون پر اطلاع پائیں، اور میٹر ریڈنگ اپ ڈیٹ کرنے کی یاد دہانی بھی۔",
    "Reminders are on for this phone. You'll get a notification when an oil change, tuning or check-up is coming up, and a nudge to update your odometer if you haven't for a while.": "اس فون پر یاد دہانیاں آن ہیں۔ آئل چینج، ٹیوننگ یا چیک اپ قریب ہونے پر اطلاع ملے گی، اور کافی دن ریڈنگ نہ لکھنے پر یاد دہانی بھی۔",
    "Sign in with Google to get reminders on this phone.": "اس فون پر یاد دہانیوں کے لیے گوگل سے سائن ان کریں۔",
    "This browser can't show notifications. On Android, open Bike Log in Chrome. On iPhone, add it to the Home Screen first.": "یہ براؤزر اطلاعات نہیں دکھا سکتا۔ اینڈرائیڈ پر بائیک لاگ کروم میں کھولیں۔ آئی فون پر پہلے اسے ہوم اسکرین پر شامل کریں۔",
    "Notifications are blocked for Bike Log. Allow them in your phone's settings (Chrome → Site settings → Notifications), then come back.": "بائیک لاگ کی اطلاعات بند ہیں۔ فون کی سیٹنگ میں اجازت دیں (Chrome ← Site settings ← Notifications)، پھر واپس آئیں۔",
    "Reminders need permission to show notifications. Tap Allow when your phone asks.": "یاد دہانیوں کے لیے اطلاع کی اجازت چاہیے۔ فون پوچھے تو Allow دبائیں۔",
    "Reminders turned on.": "یاد دہانیاں آن ہو گئیں۔",
    "Reminders turned off for this phone.": "اس فون پر یاد دہانیاں بند ہو گئیں۔",
    "Couldn't turn on reminders. Please try again.": "یاد دہانیاں آن نہیں ہو سکیں۔ دوبارہ کوشش کریں۔",
    "You're offline. Turning on reminders needs internet.": "آپ آف لائن ہیں۔ یاد دہانیاں آن کرنے کے لیے انٹرنیٹ چاہیے۔",
    "Couldn't turn off reminders. Check your internet and try again.": "یاد دہانیاں بند نہیں ہو سکیں۔ انٹرنیٹ چیک کر کے دوبارہ کوشش کریں۔",
    "Install Bike Log on your phone": "بائیک لاگ اپنے فون میں انسٹال کریں",
    "Tap Install to add it to your home screen like a normal app.": "\"انسٹال\" دبائیں، یہ عام ایپ کی طرح ہوم اسکرین پر آ جائے گی۔",
    "Opened from WhatsApp? Tap": "واٹس ایپ سے کھولا ہے؟ پہلے اوپر دائیں",
    "(top right) →": "دبائیں ←",
    "first.": "۔",
    "Open in Chrome": "Open in Chrome",
    "In Chrome, tap": "کروم میں اوپر دائیں",
    "Install app": "Install app",
    "or": "یا",
    "Add to Home screen": "Add to Home screen",
    "On iPhone, open in Safari → tap": "آئی فون پر سفاری میں کھولیں ←",
    "Share": "Share",
    "Add to Home Screen": "Add to Home Screen",
    "Open Bike Log from your home screen and sign in with Google.": "ہوم اسکرین سے بائیک لاگ کھولیں اور گوگل سے سائن ان کریں۔",
    "Install": "انسٹال کریں",
    "Not now": "ابھی نہیں",
    "Share Bike Log with someone": "بائیک لاگ کسی کو بھیجیں",
    "Share this app": "یہ ایپ شیئر کریں",
    "Message copied too, so you can paste it anywhere.": "پیغام کاپی بھی ہو گیا، کہیں بھی پیسٹ کر سکتے ہیں۔",
    "Also done on this visit": "اسی وقت یہ کام بھی ہوئے",
    "Oil cost": "آئل کا خرچ",
    "Tuning cost": "ٹیوننگ کا خرچ",
    "Repairs": "مرمت",
    "Repairs cost": "مرمت کا خرچ",
    "Service cost": "سروس کا خرچ",
    "Save repairs": "مرمت محفوظ کریں",
    "Repairs saved.": "مرمت محفوظ ہو گئی۔",
    "Save visit": "سب محفوظ کریں",
    "Visit saved.": "سارے کام محفوظ ہو گئے۔",
    "Total cost fills in from each job's cost and labour.": "کل خرچ ہر کام کے خرچ اور مزدوری سے خود بن جاتا ہے۔",
    "e.g. Puncture fixed, brakes adjusted": "مثلاً پنکچر لگا، بریک سیٹ کیے",
    "Part price": "پرزے کی قیمت",
    "Mechanic / labour cost": "مستری / مزدوری کا خرچ",
    "Mechanic / labour": "مستری / مزدوری",
    "Remove": "ہٹائیں",
    "Remove this part": "یہ پرزہ ہٹائیں",
    "Total cost fills in from the part prices and labour.": "کل خرچ پرزوں کی قیمت اور مزدوری سے خود بن جاتا ہے۔",
    // 4.2: shop customers and jobs
    "My customers": "میرے گاہک",
    "When a customer scans your QR code and lets your shop add jobs, their bike shows here.": "جب کوئی گاہک آپ کا QR کوڈ اسکین کر کے آپ کی دکان کو کام درج کرنے کی اجازت دے گا، تو اس کی بائیک یہاں نظر آئے گی۔",
    "Print the QR poster and put it where customers wait. Customers who let your shop add jobs show below.": "QR پوسٹر پرنٹ کر کے وہاں لگائیں جہاں گاہک انتظار کرتے ہیں۔ جن گاہکوں نے آپ کی دکان کو کام درج کرنے کی اجازت دی ہے وہ نیچے نظر آئیں گے۔",
    "Add a job for this bike": "اس بائیک کا کام درج کریں",
    "What was done?": "کیا کام ہوا؟",
    "Total bill": "کل بل",
    "Leave the total empty and it adds up the parts and labour.": "کل بل خالی چھوڑ دیں تو پرزوں اور مزدوری کو جوڑ کر خود بن جائے گا۔",
    "Save job": "کام محفوظ کریں",
    "Saving…": "محفوظ ہو رہا ہے…",
    "Tick what was done on this bike.": "اس بائیک پر جو کام ہوا اس پر نشان لگائیں۔",
    "Job saved. The bike's owner sees it in their history.": "کام محفوظ ہو گیا۔ بائیک کا مالک اسے اپنی ہسٹری میں دیکھ سکتا ہے۔",
    "You're offline. Saving a job for a customer needs internet.": "آپ آف لائن ہیں۔ گاہک کا کام محفوظ کرنے کے لیے انٹرنیٹ چاہیے۔",
    "Couldn't save the job. The owner may have stopped your shop adding jobs to this bike.": "کام محفوظ نہیں ہو سکا۔ شاید مالک نے آپ کی دکان کو اس بائیک پر کام درج کرنے سے روک دیا ہے۔",
    "Loading jobs…": "کام لوڈ ہو رہے ہیں…",
    "Couldn't load the jobs. Check your connection and try again.": "کام لوڈ نہیں ہو سکے۔ انٹرنیٹ چیک کر کے دوبارہ کوشش کریں۔",
    "No jobs from your shop yet.": "آپ کی دکان کا ابھی کوئی کام درج نہیں۔",
    "Delete job": "کام ڈیلیٹ کریں",
    "Job deleted.": "کام ڈیلیٹ ہو گیا۔",
    "Couldn't delete the job.": "کام ڈیلیٹ نہیں ہو سکا۔",
    "Owner:": "مالک:",
    "Add job": "کام درج کریں",
    "Show jobs": "کام دیکھیں",
    "Hide jobs": "کام چھپائیں",
    "e.g. 12450": "مثلاً 12450",
    "This shop can add jobs to:": "یہ دکان اس بائیک پر کام درج کر سکتی ہے:",
    "Stop this shop adding jobs": "اس دکان کو کام درج کرنے سے روکیں",
    "Tap again to stop": "روکنے کے لیے دوبارہ ٹیپ کریں",
    "Done. This shop can now add jobs to your bike.": "ہو گیا۔ اب یہ دکان آپ کی بائیک پر کام درج کر سکتی ہے۔",
    "Couldn't do that. Check your connection and try again.": "یہ نہیں ہو سکا۔ انٹرنیٹ چیک کر کے دوبارہ کوشش کریں۔",
    "Stopped. Jobs it already added stay in your history.": "روک دیا گیا۔ جو کام پہلے درج ہو چکے وہ آپ کی ہسٹری میں رہیں گے۔",
    // 4.3: bills and customer-brought parts
    "Customer brought it": "گاہک خود لایا",
    "Customer's WhatsApp number (optional)": "گاہک کا واٹس ایپ نمبر (اختیاری)",
    "Saved on this phone only, for sending bills.": "صرف اسی فون پر محفوظ، بل بھیجنے کے لیے۔",
    "Send bill on WhatsApp": "واٹس ایپ پر بل بھیجیں",
    "Send bill": "بل بھیجیں",
    "customer's own part": "گاہک کا اپنا پرزہ",
    "own part": "اپنا پرزہ",
    "Close": "بند کریں",
    // 4.3.1: in-app QR scanner
    "Scan mechanic's QR code": "مستری کا QR کوڈ اسکین کریں",
    "Tap Scan above and point the camera at your mechanic's Bike Log QR code to save his shop here.": "اوپر اسکین دبائیں اور کیمرہ اپنے مستری کے Bike Log QR کوڈ کی طرف کریں، اس کی دکان یہاں محفوظ ہو جائے گی۔",
    "Point the camera at the mechanic's Bike Log QR code.": "کیمرہ مستری کے Bike Log QR کوڈ کی طرف کریں۔",
    "This phone can't open the camera inside the app. Scan the poster with your phone's camera instead.": "یہ فون ایپ کے اندر کیمرہ نہیں کھول سکتا۔ پوسٹر فون کے کیمرے سے اسکین کریں۔",
    "Camera is blocked for Bike Log. Allow the camera in your phone's settings for this app, then try again.": "Bike Log کے لیے کیمرہ بند ہے۔ فون کی سیٹنگز میں اس ایپ کو کیمرے کی اجازت دیں، پھر دوبارہ کوشش کریں۔",
    "Couldn't open the camera. Close other apps using it and try again.": "کیمرہ نہیں کھل سکا۔ کیمرہ استعمال کرنے والی دوسری ایپس بند کر کے دوبارہ کوشش کریں۔",
    "Couldn't load the scanner. Please try again.": "اسکینر لوڈ نہیں ہو سکا۔ دوبارہ کوشش کریں۔",
    "Connect to the internet once to use the scanner.": "اسکینر استعمال کرنے کے لیے ایک بار انٹرنیٹ سے جڑیں۔",
    "That isn't a Bike Log shop code. Scan the QR code on your mechanic's Bike Log poster.": "یہ Bike Log دکان کا کوڈ نہیں ہے۔ اپنے مستری کے Bike Log پوسٹر والا QR کوڈ اسکین کریں۔",
    "Sign in with Google to save shops.": "دکانیں محفوظ کرنے کے لیے گوگل سے سائن ان کریں۔",
    // 4.3.2: picture bill
    "Making the bill…": "بل بن رہا ہے…",
    "Share bill": "بل بھیجیں",
    "Save picture": "تصویر محفوظ کریں",
    "Send as text": "لکھائی میں بھیجیں",
    "Couldn't make the picture. Use Send as text instead.": "تصویر نہیں بن سکی۔ لکھائی میں بھیجیں استعمال کریں۔",
    "Couldn't open sharing. Tap Save picture, then send it on WhatsApp.": "شیئر نہیں کھل سکا۔ تصویر محفوظ کریں دبائیں، پھر واٹس ایپ پر بھیج دیں۔",
    "Picture saved. Send it to the customer on WhatsApp.": "تصویر محفوظ ہو گئی۔ اسے واٹس ایپ پر گاہک کو بھیج دیں۔",
    // 4.4: Rider and Shop modes
    "Shop mode": "دکان موڈ",
    "Customers": "گاہک",
    "Rider mode": "سوار موڈ",
    "Set up your shop first. Then print your QR code so customers can link their bikes to you.": "پہلے اپنی دکان بنائیں۔ پھر اپنا QR کوڈ پرنٹ کریں تاکہ گاہک اپنی بائیک آپ سے جوڑ سکیں۔",
    "Are you a mechanic or run a parts shop?": "کیا آپ مستری ہیں یا پرزوں کی دکان چلاتے ہیں؟",
    "Your shop's customers, jobs and bills are in Shop mode.": "آپ کی دکان کے گاہک، کام اور بل دکان موڈ میں ہیں۔",
    "Open Shop mode": "دکان موڈ کھولیں",
    "Send setup link to a mechanic": "مستری کو سیٹ اپ لنک بھیجیں",
    "Print the QR poster and put it where customers wait. Customers who let your shop add jobs show on the Customers tab.": "QR پوسٹر پرنٹ کر کے وہاں لگائیں جہاں گاہک انتظار کرتے ہیں۔ جن گاہکوں نے آپ کی دکان کو کام درج کرنے کی اجازت دی ہے وہ گاہک والے ٹیب میں نظر آئیں گے۔",
    // 4.5: mechanics near me
    "Mechanics on Bike Log near me": "قریب میں Bike Log والے مستری",
    "Show mechanics near me": "قریبی مستری دکھائیں",
    "Refresh": "دوبارہ لوڈ کریں",
    "More on Google Maps": "گوگل میپس پر مزید",
    "Your shop": "آپ کی دکان",
    "Directions": "راستہ",
    "Save to My mechanics": "میرے مستریوں میں محفوظ کریں",
    "Saved in My mechanics": "میرے مستریوں میں محفوظ ہے",
    "Saved in My mechanics.": "میرے مستریوں میں محفوظ ہو گیا۔",
    "Couldn't save. Check your connection and try again.": "محفوظ نہیں ہو سکا۔ انٹرنیٹ چیک کر کے دوبارہ کوشش کریں۔",
    "Sign in with Google to see mechanics on Bike Log.": "Bike Log والے مستری دیکھنے کے لیے گوگل سے سائن ان کریں۔",
    "Finding your location…": "آپ کا مقام تلاش ہو رہا ہے…",
    "Loading mechanics…": "مستری لوڈ ہو رہے ہیں…",
    "No mechanics have joined Bike Log yet. Send the setup link to your mechanic from the More tab.": "ابھی کوئی مستری Bike Log میں شامل نہیں ہوا۔ مزید والے ٹیب سے اپنے مستری کو سیٹ اپ لنک بھیجیں۔",
    "Location is off, so the list isn't sorted by distance. Allow location for Bike Log to see the nearest first.": "مقام بند ہے، اس لیے فہرست فاصلے کے حساب سے نہیں۔ قریب ترین پہلے دیکھنے کے لیے Bike Log کو مقام کی اجازت دیں۔",
    "Nearest first.": "قریب ترین پہلے۔",
    "Couldn't load mechanics. Please try again.": "مستری لوڈ نہیں ہو سکے۔ دوبارہ کوشش کریں۔",
    "You're offline. Connect to the internet to see mechanics.": "آپ آف لائن ہیں۔ مستری دیکھنے کے لیے انٹرنیٹ سے جڑیں۔",
    "Show my shop in Mechanics near me": "میری دکان قریبی مستریوں میں دکھائیں",
    // 4.6: parts stock
    "Stock": "اسٹاک",
    "Parts stock": "پرزوں کا اسٹاک",
    "+ Add part": "+ پرزہ شامل کریں",
    "Quantity in shop": "دکان میں تعداد",
    "Sale price": "فروخت کی قیمت",
    "Buying price (optional)": "خرید کی قیمت (اختیاری)",
    "Warn me when only": "کتنے رہ جانے پر بتائیں",
    "Buying price stays private to your shop. It will help show your profit later.": "خرید کی قیمت صرف آپ کی دکان تک رہتی ہے۔ بعد میں منافع دکھانے میں مدد دے گی۔",
    "Save part": "پرزہ محفوظ کریں",
    "Search parts": "پرزے تلاش کریں",
    "Add the parts you keep in your shop. When you use one in a job, the count goes down by itself.": "اپنی دکان میں رکھے پرزے شامل کریں۔ کسی کام میں پرزہ لگانے پر تعداد خود کم ہو جائے گی۔",
    "No price set": "قیمت نہیں لکھی",
    "Out of stock": "ختم ہو گیا",
    "Running low": "کم رہ گیا",
    "in shop": "دکان میں",
    "One less": "ایک کم",
    "One more": "ایک زیادہ",
    "From my stock": "میرے اسٹاک سے",
    "Not from my stock": "میرے اسٹاک سے نہیں",
    "Part removed from stock.": "پرزہ اسٹاک سے ہٹا دیا گیا۔",
    "Couldn't delete. Check your connection and try again.": "ڈیلیٹ نہیں ہو سکا۔ انٹرنیٹ چیک کر کے دوبارہ کوشش کریں۔",
    "Type the part's name.": "پرزے کا نام لکھیں۔",
    "Part updated.": "پرزہ اپ ڈیٹ ہو گیا۔",
    "Part added to stock.": "پرزہ اسٹاک میں شامل ہو گیا۔",
    "Couldn't save the part. Please try again.": "پرزہ محفوظ نہیں ہو سکا۔ دوبارہ کوشش کریں۔",
    "You're offline. Saving stock needs internet.": "آپ آف لائن ہیں۔ اسٹاک محفوظ کرنے کے لیے انٹرنیٹ چاہیے۔",
    "Couldn't update. Check your connection and try again.": "اپ ڈیٹ نہیں ہو سکا۔ انٹرنیٹ چیک کر کے دوبارہ کوشش کریں۔",
    "e.g. Spark plug": "مثلاً پلگ",
    // 4.6.1: oil from stock
    "Oil from my stock": "میرے اسٹاک سے آئل",
    "Oil price": "آئل کی قیمت",
    "Customer brought the oil": "گاہک آئل خود لایا",
    "Jan": "جنوری", "Feb": "فروری", "Mar": "مارچ", "Apr": "اپریل", "May": "مئی", "Jun": "جون",
    "Jul": "جولائی", "Aug": "اگست", "Sep": "ستمبر", "Oct": "اکتوبر", "Nov": "نومبر", "Dec": "دسمبر"
  };

  // Part names inside longer text (e.g. "Chain + Sprocket set", "Chain Rs 3,000")
  const PART_UR = {
    "Front brake shoes/pads": "اگلے بریک شو / پیڈ", "Rear brake shoes": "پچھلے بریک شو", "Sprocket set": "اسپراکٹ سیٹ",
    "Front tyre": "اگلا ٹائر", "Rear tyre": "پچھلا ٹائر", "Clutch plates": "کلچ پلیٹس", "Battery pack": "بیٹری پیک",
    "Drive belt": "ڈرائیو بیلٹ", "Motor bearings": "موٹر کے بیئرنگ", "Other part": "کوئی اور پرزہ",
    "Controller": "کنٹرولر", "Charger": "چارجر", "Throttle": "ریس (تھروٹل)", "Battery": "بیٹری", "Chain": "چین"
  };
  const PART_RE = new RegExp("\\b(" + Object.keys(PART_UR).map(k => k.replace(/[/]/g, "\\/")).join("|") + ")\\b", "g");

  // Phrases inside longer text (applied in order). $1, $2 = the numbers or names kept from the English.
  const FRAG = [
    [/(\d[\d,]*) entr(?:y|ies) logged/g, "$1 اندراجات"],
    [/ · electric\b/g, " · الیکٹرک"],
    [/^Bike (\d+)$/, "بائیک $1"],
    [/Last done at ([\d,]+) km/g, "پچھلی بار $1 کلومیٹر پر"],
    [/ · due at ([\d,]+) km or /g, " · اگلی بار $1 کلومیٹر یا "],
    [/ · due at ([\d,]+) km/g, " · اگلی بار $1 کلومیٹر پر"],
    [/\((\d+) days\)/g, "($1 دن)"],
    [/ · at your usual riding, about (\d+) days/g, " · آپ کی عام سواری کے حساب سے تقریباً $1 دن"],
    [/ · at your usual riding it may already be due, check your reading/g, " · آپ کی عام سواری کے حساب سے شاید وقت ہو چکا، میٹر ریڈنگ چیک کریں"],
    [/Recent range ([\d,]+) km per charge, was ([\d,]+) km/g, "اب رینج $1 کلومیٹر فی چارج، پہلے $2 کلومیٹر تھی"],
    [/ · the battery is weakening/g, " · بیٹری کمزور ہو رہی ہے"],
    [/Needs (\d+) more charges? to measure/g, "حساب کے لیے $1 مزید چارج درکار"],
    [/About (\d+) km per unit \(kWh\)/g, "تقریباً $1 کلومیٹر فی یونٹ"],
    [/Last charge: ([\d,]+) km · add battery size for km per unit/g, "پچھلا چارج: $1 کلومیٹر · فی یونٹ حساب کے لیے بیٹری سائز لکھیں"],
    [/Last tank: ([\d.]+) km\/L/g, "پچھلی ٹینکی: $1 کلومیٹر فی لیٹر"],
    [/Running cost: (\S+) ([\d.,]+) per km/g, "فی کلومیٹر خرچ: $1 $2"],
    [/^Fitted /, "لگایا: "],
    [/ at ([\d,]+) km/g, " — $1 کلومیٹر پر"],
    [/under a month old/g, "ایک مہینے سے کم پرانا"],
    [/(\d+) months? old/g, "$1 مہینے پرانا"],
    [/life ([\d,]+) km/g, "عمر $1 کلومیٹر"],
    [/life ([\d,]+) months/g, "عمر $1 مہینے"],
    [/([\d,]+) km on it/g, "$1 کلومیٹر چل چکا"],
    [/([\d,]+) km left/g, "$1 کلومیٹر باقی"],
    [/(\d+) days left/g, "$1 دن باقی"],
    [/(\d+) months left/g, "$1 مہینے باقی"],
    [/^Deleted \((\d+)\)$/, "حذف شدہ ($1)"],
    [/Added by you/g, "آپ نے درج کیا"],
    [/Added by (.+?)(?= · |$)/g, "$1 نے درج کیا"],
    [/Edited by you/g, "آپ نے ترمیم کی"],
    [/Edited by (.+?)(?= · |$)/g, "$1 نے ترمیم کی"],
    [/Deleted by (.+?) on /g, "$1 نے حذف کیا، "],
    [/^(Charging|Fuel|Oil changes|Service & repairs|Tuning|Parts|Mechanic \/ labour) · (\d+) entr(?:y|ies)$/, (m, k, n) => ({ "Charging": "چارجنگ", "Fuel": "پیٹرول", "Oil changes": "آئل چینج", "Service & repairs": "سروس اور مرمت", "Tuning": "ٹیوننگ", "Parts": "پرزے", "Mechanic / labour": "مستری / مزدوری" }[k] + " · " + n + " اندراجات")],
    [/^Part (\d+)$/, "پرزہ $1"],
    [/^Parts (\S+) ([\d,]+) \+ labour (\S+) ([\d,]+) = (\S+) ([\d,]+)$/, "پرزے $1 $2 + مزدوری $3 $4 = $5 $6"],
    [/^Name the part you replaced \(part (\d+)\)\.$/, "جو پرزہ بدلا اس کا نام لکھیں (پرزہ $1)۔"],
    [/\bLabour (\S+) ([\d,]+)/g, "مزدوری $1 $2"],
    [/ \+ (\d+) more$/, " + $1 اور"],
    [PART_RE, (m) => PART_UR[m]],
    [/(\d[\d,]*) entr(?:y|ies)/g, "$1 اندراجات"],
    [/ · shared with (.+)$/g, " · $1 کے ساتھ شیئر"],
    [/ · shared by (.+)$/g, " · $1 نے شیئر کی"],
    [/(\d+) members?/g, "$1 ممبر"],
    [/(\d+) bikes? shared/g, "$1 بائیکس شیئر"],
    [/ · owner$/, " · مالک"],
    [/^Bikes: /, "بائیکس: "],
    [/^No bikes shared yet\. Tap Edit on a bike above and tick (.+)\.$/, "ابھی کوئی بائیک شیئر نہیں۔ اوپر کسی بائیک پر \"ترمیم\" دبائیں اور $1 پر نشان لگائیں۔"],
    [/^Nothing logged under (.+) yet\.$/, (m, k) => (EXACT[k] || k) + " میں ابھی کچھ درج نہیں۔"],
    [/([\d.]+) L\b/g, "$1 لیٹر"],
    [/\/L\b/g, "/لیٹر"],
    [/ · full tank/g, " · ٹینکی فل"],
    [/ · partial/g, " · آدھی"],
    [/ · charging station/g, " · چارجنگ اسٹیشن"],
    [/ · home\b/g, " · گھر"],
    [/≈ ([\d.]+) units/g, "≈ $1 یونٹ"],
    [/Carburetor cleaned/g, "کاربوریٹر صاف"],
    [/Tappets set/g, "ٹیپٹ سیٹ"],
    [/Idle \/ mixture set/g, "آئیڈل / مکسچر سیٹ"],
    [/Chain lube & adjust/g, "چین گریس اور ٹائٹ"],
    [/filter changed/g, "فلٹر بدلا"],
    [/^(.+) added\. You're now logging for this bike\.$/, "$1 شامل ہو گئی۔ اب اندراجات اسی بائیک کے ہوں گے۔"],
    [/^Tap again: deletes (\d+) entries too$/, "دوبارہ ٹیپ کریں: اس کے $1 اندراجات بھی حذف ہوں گے"],
    [/^(.+) group created\. Invite your family, then share a bike with it\.$/, "$1 گروپ بن گیا۔ فیملی کو دعوت دیں، پھر اس کے ساتھ بائیک شیئر کریں۔"],
    [/^Backup saved with (\d+) entries\. Check your Downloads folder\.$/, "$1 اندراجات کا بیک اپ بن گیا۔ ڈاؤن لوڈز فولڈر دیکھیں۔"],
    [/^Restored (\d+) entries\.$/, "$1 اندراجات بحال ہو گئے۔"],
    [/^Moved (\d+) entr(?:y|ies) from this phone to your account\.$/, "$1 اندراجات اس فون سے آپ کے اکاؤنٹ میں منتقل ہو گئے۔"],
    [/^You've joined "(.+)"\. Shared bikes appear in My bikes\.$/, "آپ \"$1\" گروپ میں شامل ہو گئے۔ شیئر کی گئی بائیکس \"میری بائیکس\" میں نظر آئیں گی۔"],
    [/^You've been invited to the "(.+)" group\. Sign in to join\.$/, "آپ کو \"$1\" گروپ میں دعوت دی گئی ہے۔ شامل ہونے کے لیے سائن ان کریں۔"],
    [/^(Couldn't load your bikes|Couldn't load your family groups|Couldn't save that entry|Couldn't delete that entry|Couldn't share the bike|Couldn't save the bike|Couldn't delete the bike)\. Check your internet and try again\.$/, (m, k) => ({ "Couldn't load your bikes": "آپ کی بائیکس لوڈ نہیں ہو سکیں", "Couldn't load your family groups": "فیملی گروپ لوڈ نہیں ہو سکے", "Couldn't save that entry": "اندراج محفوظ نہیں ہو سکا", "Couldn't delete that entry": "اندراج حذف نہیں ہو سکا", "Couldn't share the bike": "بائیک شیئر نہیں ہو سکی", "Couldn't save the bike": "بائیک محفوظ نہیں ہو سکی", "Couldn't delete the bike": "بائیک حذف نہیں ہو سکی" }[k] + "۔ انٹرنیٹ چیک کر کے دوبارہ کوشش کریں۔")],
    [/^Home cost worked out from ([\d.]+) kWh × Rs ([\d.]+)\/unit\. Change it if needed\.$/, "گھر کا خرچ $1 kWh × $2 روپے فی یونٹ سے نکالا گیا۔ ضرورت ہو تو بدل دیں۔"],
    [/^Filled in: /, "خود بھر دیا گیا: "],
    [/(\S+V) (\S+Ah) battery/g, "$1 $2 بیٹری"],
    [/(\S+)Ah battery \(volts not published, so kWh is left for you to add\)/g, "$1Ah بیٹری (وولٹ شائع نہیں ہوئے، اس لیے kWh آپ خود لکھیں)"],
    [/([\d.]+) kWh battery/g, "$1 kWh بیٹری"],
    [/maker's claimed range (.+?) km per charge/g, "کمپنی کے مطابق رینج $1 کلومیٹر فی چارج"],
    [/This is the graphene battery\. The lithium version is (\S+) (\S+) \((\S+) kWh\)\./g, "یہ گرافین بیٹری ہے۔ لیتھیم ورژن $1 $2 ($3 kWh) ہے۔"],
    [/If your battery sticker says something different, change it\./g, "اگر بیٹری کے اسٹیکر پر کچھ اور لکھا ہو تو اسے بدل دیں۔"],
    [/^Your entries are saved on this phone only\. Tap Backup now and then to keep a safe copy\./, "آپ کے اندراجات صرف اس فون پر محفوظ ہیں۔ وقتاً فوقتاً \"ابھی بیک اپ کریں\" دبا کر کاپی محفوظ کر لیں۔"],
    [/ \(Online sync couldn't load\. Check your internet and reopen the app\.\)$/, " (آن لائن سنک لوڈ نہیں ہو سکا۔ انٹرنیٹ چیک کر کے ایپ دوبارہ کھولیں۔)"],
    [/^You(?= · |$)/, "آپ"],
    [/Spark plug/g, "پلگ"],
    [/Air filter/g, "ایئر فلٹر"],
    [/\b(\d{1,2}:\d{2}) AM\b/g, "$1 صبح"],
    [/\b(\d{1,2}:\d{2}) PM\b/g, "$1 شام"],
    [/([\d,]+) km\b/g, "$1 کلومیٹر"],
    [/^Version ([\d.]+)/, "ورژن $1"],
    [/ · Updated /, " · اپ ڈیٹ: "],
    [/^Signed in as /, "سائن ان: "],
    [/^now ([\d,]+)$/, "ابھی $1"],
    [/^your setting: ([\d,]+)$/, "آپ کی سیٹنگ: $1"],
    [/^e\.g\. /, "مثلاً "],
    [/^Remove (.+)$/, "$1 کو ہٹائیں"],
    [/\bOil change:?/g, "آئل چینج"],
    [/\bTuning:?/g, "ٹیوننگ"],
    [/\bRepairs:?/g, "مرمت"],
    [/\bService:?(?! &)/g, "سروس"],
    [/\bParts\b/g, "پرزے"],
    [/\bLabour\b/g, "مزدوری"],
    [/^Join my "(.+)" group on Bike Logbook so we can track our bikes together: (\S+)$/, "بائیک لاگ بک پر میرے \"$1\" گروپ میں شامل ہوں تاکہ ہم مل کر بائیکس کا ریکارڈ رکھیں: $2"],
    [/^(\d+) parts · (\d+) running low$/, "$1 پرزے · $2 کم رہ گئے"],
    [/^(\d+) parts · all in stock$/, "$1 پرزے · سب موجود"],
    [/^(.+): now out of stock\.$/, "$1: اسٹاک ختم ہو گیا۔"],
    [/^(.+): only (\d+) left in stock\.$/, "$1: اسٹاک میں صرف $2 رہ گئے۔"],
    [/ · (\d[\d,]*) left · /g, " · $1 باقی · "],
    [/\bown oil\b/g, "اپنا آئل"],
    [/\bown part\b/g, "اپنا پرزہ"],
  ];
  const MONTHS = { Jan: "جنوری", Feb: "فروری", Mar: "مارچ", Apr: "اپریل", May: "مئی", Jun: "جون", Jul: "جولائی", Aug: "اگست", Sep: "ستمبر", Oct: "اکتوبر", Nov: "نومبر", Dec: "دسمبر" };
  const MONTH_RE = /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/g;

  let lang = "en";
  try { lang = localStorage.getItem(KEY) === "ur" ? "ur" : "en"; } catch (e) {}

  function tr(s) {
    if (!s) return s;
    const t = s.trim();
    if (!t) return s;
    if (Object.prototype.hasOwnProperty.call(EXACT, t)) return s.replace(t, EXACT[t]);
    let out = s;
    for (const [re, rep] of FRAG) { re.lastIndex = 0; out = out.replace(re, rep); }
    if (/\d/.test(out)) out = out.replace(MONTH_RE, (m) => MONTHS[m]);
    return out;
  }

  const origText = new WeakMap();
  const origAttr = new WeakMap();
  const ATTRS = ["placeholder", "title", "aria-label", "label"];
  let busy = false;

  function skip(el) { return !el || el.closest && el.closest("script,style,[data-noi18n]"); }
  function doText(n) {
    if (skip(n.parentElement) || (n.parentElement && n.parentElement.closest("textarea"))) return;
    const cur = n.nodeValue, next = tr(cur);
    if (next !== cur) { if (!origText.has(n)) origText.set(n, cur); n.nodeValue = next; }
  }
  function doEl(el) {
    if (skip(el)) return;
    for (const a of ATTRS) {
      if (!el.hasAttribute || !el.hasAttribute(a)) continue;
      if (a === "label" && el.tagName !== "OPTGROUP" && el.tagName !== "OPTION") continue;
      const cur = el.getAttribute(a), next = tr(cur);
      if (next !== cur) {
        let m = origAttr.get(el); if (!m) { m = {}; origAttr.set(el, m); }
        if (!(a in m)) m[a] = cur;
        el.setAttribute(a, next);
      }
    }
  }
  function walk(root) {
    if (root.nodeType === 3) { doText(root); return; }
    if (root.nodeType !== 1) return;
    doEl(root);
    const it = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
    let n; while ((n = it.nextNode())) { if (n.nodeType === 3) doText(n); else doEl(n); }
  }
  function restore(root) {
    const it = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
    let n; while ((n = it.nextNode())) {
      if (n.nodeType === 3) { if (origText.has(n)) { n.nodeValue = origText.get(n); origText.delete(n); } }
      else { const m = origAttr.get(n); if (m) { for (const a in m) n.setAttribute(a, m[a]); origAttr.delete(n); } }
    }
  }

  const obs = new MutationObserver((recs) => {
    if (lang !== "ur" || busy) return;
    busy = true;
    try {
      for (const r of recs) {
        if (r.type === "childList") r.addedNodes.forEach(walk);
        else if (r.type === "characterData") doText(r.target);
        else if (r.type === "attributes") doEl(r.target);
      }
    } finally { busy = false; }
  });

  let fontLoaded = false;
  function loadFont() {
    if (fontLoaded) return; fontLoaded = true;
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;600;700&display=swap";
    document.head.appendChild(l);
  }

  function applyDir() {
    const root = document.documentElement;
    root.setAttribute("lang", lang === "ur" ? "ur" : "en");
    root.setAttribute("dir", lang === "ur" ? "rtl" : "ltr");
  }

  function start() {
    applyDir();
    if (lang === "ur") { loadFont(); busy = true; walk(document.body); busy = false; }
    obs.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTRS });
  }

  function set(l) {
    if (l === lang) return;
    lang = l;
    try { localStorage.setItem(KEY, l); } catch (e) {}
    applyDir();
    busy = true;
    if (l === "ur") { loadFont(); walk(document.body); } else restore(document.body);
    busy = false;
    document.dispatchEvent(new CustomEvent("bike-lang", { detail: l }));
  }

  window.BikeI18n = { get lang() { return lang; }, set, tr: (s) => (lang === "ur" ? tr(s) : s), toUr: (s) => tr(s), start };
  applyDir();
})();
