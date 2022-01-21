import { Alert, ToastAndroid, I18nManager, Platform } from "react-native";
import { localStorage } from './localStorageProvider';
import AsyncStorage from "@react-native-community/async-storage";
import { config } from "./configProvider";

global.language_key = 1;
class Language_provider {

  language_get = async () => {
    var item = await AsyncStorage.getItem('language');
    console.log('check launguage option', item)
    if (item != null) {
      console.log('kya bat h vikas bhai', config.language)
      config.language = item;
    }
    console.log('language_key123', config.language)
  }

  language_set = (value) => {
    config.language = value;
    localStorage.setItemObject('language', value)
  }

  // last name====================
  emptyName = ['Please enter  name', 'لرجاء ادخال الاسم']
  NameMinLength = [' name must be of minimum 3 characters', ' يجب ان لا يقل الاسم عن 3 احرف ']
  NameMaxLength = [' name cannot be more than 50 characters.', ' يجب ان لا يزيد الاسم عن 50 حرف ']
  validName = ['Enter valid  name', 'ادخل اسما صحيحا ']
  //email============================
  emptyEmail = ["Please enter email", "الرجاء ادخال البريد الالكتروني "]
  emailMaxLength = ['Email cannot be more than 50 characters', 'يجب ان لا يتجاوز البريد الالكتروني عن 50 حرف ']
  validEmail = ["Please enter valid email", "الرجاء ادخال بريد الكتروني صحيح "]
  //city============
  emptyCity = ['Please select city', "الرجاء اختيار المدينة "]
  //DOB============
  emptydob = ['Please select date of birth', "الرجاء اختيار تاريخ الميلاد "]
  //DOB============
  emptygender = ['Please select gender', "الرجاء اختيار الجنس "]

  //password=========================
  emptyPassword = ['Please enter password', 'الرجاء ادكال كلمة المرور ']
  PasswordMinLength = ['Password must be of minimum 6 characters', 'كلمة المرور يجب ان لا تقل عن 6 احرف ']
  PasswordMaxLength = ['Password cannot be more than 16 characters', "كلمة المرور يجب ان لا تزيد عن 16 حرف "]
  //cpassword=====================
  // For Confirm Password
  emptyConfirmPWD = ['Please confirm your password', "الرجاء تأكيد كلمة المرور "]
  ConfirmPWDMatch = ['Password does not match', "كلمة المرور غير مطابقة "]
  ConfirmPWDMinLength = ['Confirm password must be of minimum 6 characters', "تأكيد كلمة المرور يجب ان لا تقل عن 6 احرف "]
  ConfirmPWDMaxLength = ['Confirm password cannot be more than 16 characters', "تأكيد كلمة المرور يجب ان لا يزيد عن 16 حرف "]

  //phone no===============
  emptyMobile = ["Please enter mobile number", "الرجاء ادخال رقم الهاتف المحمول "]
  MobileMinLength = ['Mobile number must be of minimum 8 digits', "رقم الهاتف المحمول يجب ان لا يقل عن 8 ارقام "]
  MobileMaxLength = ['Mobile number cannot be more than 8 digits', 'رقم الهاتف المحمول يجب ان لا يزيد عن 8 ارقام ']
  validMobile = ["Please enter valid mobile number ", "الرجاء ادخال رقم هاتف صحيح "]
  //boat add=============
  //boat name=====
  emptyBoatName = ['Please enter boat name', 'الرجاء ادخال اسم القارب  ']
  BoatNameMinLength = ['Boat name must be of minimum 3 characters', 'رقم القارب يجب ان لا يقل عن 3 ارقام ']
  BoatNameMaxLength = ['Boat name cannot be more than 50 characters.', 'رقم القارب يجب ان لا يزيد عن 50 رقم ']
  //boat number ================
  emptyBoatNumber = ['Please enter boat number', 'الرجاء ادخال رقم القارب ']
  BoatNumberMinLength = ['Boat Number must be of minimum 3 characters', 'رقم القارب يجب ان لا يقل عن 3 ارقام ']
  BoatNumberMaxLength = ['Boat Number cannot be more than 50 characters.', 'رقم القارب يجب ان لا يقل عن 50 رقم ']
  //boat registration_no ================
  emptyBoatRegistration_no = ['Please enter registration number', 'الرجاء ادخال رقم تسجيل القارب ']
  BoatRegistration_noMinLength = ['Registration number must be of minimum 3 characters', 'رقم تسجيل القارب يجب ان لا يقل عن 3 احرف ']
  Boatregistration_noMaxLength = ['Registration number cannot be more than 50 characters.', 'رقم تسجيل القارب يجب ان لا يزيد عن 50 حرف ']
  //boat year===============
  emptyBoatYear = ['Please enter boat year', 'الرجاء ادخال سنة الصنع ']
  //boat length===============
  emptyBoatLength = ['Please enter boat length', 'الرجاء ادخال حجم القارب ']
  //boat capacity===============
  emptyBoatCapacity = ['Please enter boat capacity', 'الرجاء ادخال اقصى عدد افراد على القارب ']
  //boat cabins===============
  emptyBoatCabins = ['Please enter no of cabins', 'الرجاء ادخال عدد الغرف  ']
  //boat toilets===============
  emptyBoatToilets = ['Please enter no of toilets', 'الرجاء ادخال عدد دورات المياه ']
  //city============
  emptyCity = ['Please select city', "الرجاء اختيار المدينة "]
  //DOB============
  emptydob = ['Please select date of birth', "الرجاء ادخال تاريخ الميلاد "]
  //gender==========
  emptygender = ['Please select gender', "الرجاء اختيار الجنس "]
  //about==========
  emptyabout = ['Please enter about text', "الرجاء ادخال نبذه عن "]
  maxlenabout = ['About cannot be more than 250 characters.', "نبذه عن يجب ان لا تزيد عن 250 حرف "]
  minlenabout = ['About must be of minimum 3 characters.', "نبذه عن يجب ان لا تقل عن 3 احرف "]
  //address==========
  emptyaddress = ['Please enter address text', "الرجاء ادخال العنوان "]
  maxlenaddress = ['Address cannot be more than 250 characters.', "العنوان يجب ان لا يزيد عن 250 حرف "]
  minlenaddress = ['Address must be of minimum 3 characters.', "العنوان يجب ان لا يقل عن 3 احرف "]
  // For old Password
  emptyoldPassword = ['Please enter old password', 'Please enter new password', 'Please enter new password', 'الرجاء ادخال كلمة المرور القديمة ', 'الرجاء ادخال كلمة السر الجديدة ', 'الرجاء ادخال كلمة السر الجديدة ']
  PasswordoldMinLength = ['Old password must be of minimum 6 characters', 'New password must be of minimum 6 characters', 'كلمة المرور القديمة يجب ان لا تقل عن 6 احرف ', 'كلمة المرور الجديدة يجب ان لا تقل عن 6 احرف ']
  PasswordoldMaxLength = ['Old password cannot be more than 16 characters', 'New password cannot be more than 16 characters', 'كلمة المرور القديمة يجب ان لا تزيد عن 16 حرف ', 'كلمة المرور الجديدة يجب ان لا تزيد عن 16 حرف ']
  // For New Password
  emptyNewPassword = ['Please enter new password', 'الرجاء ادخال كلمة مرور جديدة ']
  PasswordNewMinLength = ['New password must be of minimum 6 characters', 'كلمة المرور الجديدة يجب ان لا تقل عن 6 احرف ']
  PasswordNewMaxLength = ['New password cannot be more than 16 characters', 'كلمة المرور الجديدة يجب ان لا تزيد عن 16 حرف ']
  // For Confirm Password
  emptyConfirmPWD = ['Please confirm your password', 'الرجاء تأكيد كلمة المرور ']
  ConfirmPWDMatch = ['Password does not match', 'كلمة المرور غير مطابقة ']
  ConfirmPWDMinLength = ['Confirm password must be of minimum 6 characters', 'تأكيد كلمة المرور يجب ان لا تقل عن 6 احرف ']
  ConfirmPWDMaxLength = ['Confirm password cannot be more than 16 characters', 'تأكيد كلمة المرور يجب ان لا تزيد عن 16 حرف ']
  //Message====
  emptyMessage = ['Please enter message text', "الرجاء ادخال رسالة "]
  maxlenMessage = ['Message cannot be more than 250 characters.', "الرسالة يجب ان لا تزيد عن 250 حرف "]
  minlenMessage = ['Message must be of minimum 3 characters.', "الرسالة يجب ان لا تقل عن 3 احرف "]
  //---------------------------share app page---------------------------//
  headdingshare = ['I’ve shared a link with you to a great new App', 'لقد شاركتك رابط تطبيق مميز ']
  sharelinktitle = ['MyBoat App Link', 'MyBoat رابط تطبيق ']
  //==========================Confirmation Messages=============================
  cancel = ['Cancel', 'إلغاء ']
  Yes = ['Yes', 'نعم ']
  No = ['No', 'لا ']
  ok = ['Ok', 'حسنا ']
  save = ['Save', 'حفظ ']
  Done = ['Done', 'تم ']
  Confirm = ["Confirm", 'تأكيد']
  Save = ['Save', 'حفظ ']
  Skip = ['Skip', 'تخطي ']
  Clear = ['Clear', 'إزالة ']
  titleexitapp = ['Exip App', 'الخروج من التطبيق ']
  exitappmessage = ['Do you want to exit app', 'هل تريد الخروج من التطبيق ', 'Você quer sair do aplicativo']
  msgConfirmTextLogoutMsg = ['Are you sure you want to Logout?', 'هل تريد فعلا تسجيل الخروج من التطبيق ؟ ']
  msgLoginError = ['Please login first?', 'الرجاء تسجيل الدخول اولا ؟ ']
  //===========static text change
  loginName = ['Enter Name', 'ادخل الاسم ']
  loginEmail = ['Email', 'البريد الالكتروني ']
  loginpassword = ['Password', 'كلمة المرور ']
  logincpass = ['Confirm Password', 'تأكيد كلمة المرور ']
  loginterm1 = ['By signing up, you agree to our', 'بالتسجيل , انت موافق على ']
  loginterm2 = [' terms of service', ' شروط الخدمة ']
  loginterm3 = [' and', ' و ']
  loginterm4 = [' privacy policy', ' سياسة الخصوصية ']
  Signup_txt = ['Signup', 'التسجيل ']
  Login_txt = ['Login', 'تسجيل دخول ']
  do_you1 = ['Do you have an account?', 'هل لديك حساب ؟ ']
  html_Privacy_Policy = [' Privacy Policy ', ' سياسة الخصوصية  ']
  text_About_Us = [' About Us', ' معلومات عنا  ']
  text_Terms_And_Conditions = [' Terms And Conditions ', ' احكام وشروط  ']
  contact_to_ad_text = ["Contact To Admin", 'تواصل مع المسئول ']

  //=========signup=======
  text_sign_in = ['Sign in', 'تسجيل الدخول ']
  text_sign_in1 = ['Sign in your social media account', 'قم بتسجيل الدخول بحساب الوسائط الاجتماعية الخاص بك ']
  text_remember_me = ['Remember me', 'تذكرني ']
  text_Guest = ['Continue As A Guest', 'دخول زائر ']
  dont_have_acc = ['Don’t have an account?', 'ليس لديك حساب ؟ ']
  txt_signup = ['Sign up', 'تسجيل ']
  txt_phone_number = ['Mobile Number', 'رقم الهاتف المحمول ']
  //============Otp===========
  otp_verification = ['Verification', 'تحقق ']
  otp_verification1 = ['Otp verification code sent on', 'تم ارسال رمز التحقق ']
  txt_edit = ['Edit', 'تعديل ']
  txt_otp = ['Otp', 'رمز التحقق ']
  txt_RESEND = ['RESEND', 'ااعادة ارسال ']
  txt_VERIFY = ['VERIFY', 'تحقق ']
  //==========forgot================
  txt_Forgot_Pass1 = ['Forgot Password ?', 'نسيت كلمة المرور ؟']
  txt_Forgot_Pass2 = ['Please enter your email for reset account', 'الرجاء ادخال البريد الالكتروني لإعادة الحساب ']
  txt_Forgot_Pass3 = ['Submit', 'ارسال ']
  //edit profile=================
  Choose_City = ['Choose City', 'اختيار المدينة ']
  Choose_Gender = ['Select Gender', 'اختيار الجنس ']
  female_txt = ['Female', 'انثى ']
  male_txt = ['Male', 'ذكر ']
  Edit_Profile_txt = ['Edit Profile', 'تعديل الملف ']
  txt_Profile = ['Profile', 'الملف الشخصي']
  dob_txt = ['Date of birth', 'تاريخ الميلاد ']
  Gender_txt = ['Gender', 'الجنس ']
  about_txt = ['About', 'نبذه عن ']
  Take_a_photo_txt = ['Take a photo', 'التقاط صورة ']
  Choose_from_library_txt = ['Choose from library', 'اختر من مكتبة الصور ']
  settings_txt = ['Settings', 'إعدادات ']
  my_waallet_txt = ['My Wallet', 'المحفظة ']
  wallet_txt = ['Wallet', 'محفظة']
  Address_txt = ["Address", "العنوان "]
  Optional_txt = ["Optional", "إختياري "]
  logout_txt = ['Logout', 'تسجيل الخروج ']
  //change pass================
  change_language_txt = ["Change Password", 'تغيير كلمة المرور ']
  old_pass_txt = ["Old Password", 'كلمة المرور القديمة ']
  new_pass_txt = ["New Password", 'كلمة المرور الجديدة ']
  c_pass_txt = ["Confirm Password", 'تأكيد كلمة المرور ']
  txt_Submit = ["Submit", 'إرسال ']
  //setting============
  text_account = ["Account", "حساب "]
  text_Notification_Setting = ["Notification Setting", "إعدادات التنبيهات "]
  text_Change_Language = ["Change Language", "تغيير اللغة "]
  text_support = ['Support', "الدعم "]
  text_share_app = ['Share App', "مشاركة التطبيق "]
  text_rate_app = ['Rate App', "تقييم التطبيق "]
  //change notification==============
  txt_Notification_Settings = ["Notification Settings", "إعدادات التنبيهات "]
  txt_Chat_Notifications = ["Chat Notifications", "تنبيهات المحادثة "]
  txt_Trip_Notifications = ["Trip Notifications", "تنبيهات الرحلة "]
  txt_Promotion_notification = ["Promotional Notifications", "تنبيهات العروض "]

  //contact us=============
  txt_message = ["Message", "سالة "]
  contact_us_txt = ["Contact Us", "تواصل معنا "]
  Send_txt = ["Send", "Send"]

  data_not_found = ['Data not found', "التاريخ غير موجود "]

  //home===========
  txt_explore = ['Explore', "استكشف "]
  txt_type_of_trips = ['Type Of Trip', "نوع الرحلة "]
  txt_view_all = ['View All', "عرض الجميع "]
  txt_Popular_Boats = ['Popular Boats', "القوارب المفضلة "]
  txt_pff = ['OFF', "OFF"]

  // inbox//
  tittleinbox = ['Inbox', 'الرسائل ']
  //chat //
  chattextinputmessage = ['Message', 'رسالة ']
  ssearch12 = ['Search City', 'البحث في المدينة']
  chataction = ['Action', 'إجراء ']
  chatreport = ['Report User', 'أبلغ عن المستخدم ']
  chatclear = ['Clear Chat', 'مسح المحادثة ']
  chatcancel = ['Cancel', 'إلغاء ']
  reportmessagepopup = ['Are your sure you want to ? report', 'هل تريد فعلا ؟ الإبلاغ ']
  chatclearpopup = ['Are your sure you to ? clear chat', 'هل تريد فعلا ؟ مسح المحادثة ']
  //add boat============
  add_boat_txt = ['Add Boat', "إضافة قارب "]
  boat_name_txt = ['Boat Name', "اسم القارب "]
  boat_no_txt = ['Boat Number', "رقم القارب "]
  boat_reg_txt = ['Boat register number', "رقم تسجيل القارب "]
  boat_year_txt = ['Boat year', "سنة صنع القارب "]
  boat_len_txt = ['Boat length', "حجم القارب "]
  boat_cap_txt = ['Boat capacity', "اقصى عدد للركاب "]
  //add advertisement-------------
  select_trip_type = ['Select Trip Type', "إختر نوع الرحلة "]
  data_not_found = ['Data Not Found', "لا يوجد تاريخ "]
  Minimum_Hours_txt = ['Minimum Hours', "ساعات الرحلة"]
  Ideal_Hours_txt = ['Idle Hours', "مدة الصيانة بعد الرحلة "]
  Select_Boat_txt = ['Select Boat', "اختر القارب "]
  Year_txt = ['Years', "السنة "]
  Capacity_txt = ['Capacity', "عدد الركاب"]
  Hours_txt    = ['Hours', "ساعات‎ "]
  Upload_pictures_txt = ['Upload pictures', "تحميل الصور "]
  Please_pictures_txt = ['Please upload (Max 8 pictures)', "الرجاء تحميل ( حد اقصى 8 صور ) "]
  Enter_Title_Arabic_txt = ['Enter Title in Arabic', "ادخل العنوان بالعربي "]
  Enter_Title_englis_txt = ['Enter Title in English', "ادخل العنوان بالانجليزي "]
  contact_number_txt = ['Contact Number', "رقم الهاتف "]
  max_people_txt = ['Max Number of People', "اقصى عدد للركاب "]
  place_of_boat_txt = ['Place of boat', "موقع القارب "]
  select_trip_txt = ['Select trip type', "إختيار نوع الرحلة "]
  description_ar_txt = ['Descriptions In Arabic', "وصف الإعلان بالعربي "]
  description_en_txt = ['Descriptions In English', "وصف الإعلان بالانجليزي "]
  Rental_Price_txt = ["Rental Price", "سعر الحجز "]
  Extrea_per_txt = ["Extra per hour price", "سعر الساعة الاضافية "]
  discount_per_txt = ["Discount %", "خصم % "]
  txt_discount = ["Discount", "خصم "]

  Extra_hours_price_txt = ["Extra Hours Price", " الساعة الإضافية "]
  Extra_hours_1price_txt = ["Extra 1 Hours Price", "سعر ساعة واحدة اضافية "]
  discount_per_txt = ["Discount %", "خصم % "]
  lenghth_txt = ["Length", "حجم القارب"]
  toilets_txt = ["Toilets", "دورة مياه "]
  cabins_txt = ["Cabins", "غرفة "]
  Description_txt = ["Description", "وصف "]
  Address_txt = ["Address", "العنوان "]
  rental_amt_txt = ["Rental Amount", "مبلغ الحجز "]
  book_now_txt = ["Book Now", "احجز "]
  extra_hours_txt = ["Extra Hours", "ساعات اضافية "]

  //booking=========
  noOfGustErr = ['You can not insert more than', "لا يمكن ادخال اكثر من "]
  noOfGustErr1 = ['guest', 'ركاب ']
  timeErr = ['Please Select Time', 'الرجاء اختيار الوقت ']
  dateErr = ['Please Select Date', 'الرجاء ادخال عدد الركاب']
  no_of_guest_e = ['Please Enter number of guest',"الرجاء ادخال عدد الركاب"]
  VailidNoOfGeuest = ['Please insert English numbers in how many geust', 'الرجاء ادخال الارقام بالانجليزي في خانة كم عدد الركاب']
  BookongAmtErrMessage = ["In your wallet not have enough balance So you have to pay some amount online", "رصيد المحفظة غير كاف , سوف يتم دفع بعض المبالغ عبر الخدمة الالكترونية "]
  EmptyReview = ["Please enter review", "Please enter review"]

  privacypolicy = ["Options", "خيارات "]
  takephot = ["Take picture", "إلتقط صورة "]
  chooselib = ["Choose from library", "إختيار من مكتبة الصور "]
  rate_now = ["Rate Now", "قييم الان "]
  text_chat = ["Chat", "Chat"]

  text_complete = ["Complete", "اكتمال "]
  text_Confirmed = ["Confirmed", "تأكيد "]
  text_Cancel_By_User = ["Cancel By User", "إلغاء من العميل "]
  text_Cancel_By_Owner = ["Cancel By Owner", "إلغاء من مزود الرحلة "]
  text_Inprogress = ["Inprogress", "رحلات جارية "]
  text_booking_details = ["Booking Detail", "تفاصيل الحجز "]
  text_select_hors = ["Select Hours", "إختيار الساعات "]
  text_request = ["Request", "طلب "]
  text_select_time = ["Select time", "إختيار الوقت "]
  text_how_many_guest = ["How Many Guest", "كم عدد الركاب "]
  text_booking_date = ["Booking Date", "تاريخ الحجز "]
  text_booking_time = ["Booking Time", "وقت الحجز "]
  text_rental_price = ["Rental price", "سعر الحجز "]
  text_extra_hours = ["Extra Hours", "الساعات الاضافية "]
  text_sub_total = ["Sub Total", "المجموع "]
  text_disc_price = ["Discount Price", "سعر الخصم "]
  text_checkout = ["Checkout", "الدفع "]
  text_favourites = ["Favourites", "المفضلة "]
  text_searach_booking_no = ["Search By Booking Number...", "البحث برقم الحجز . . . "]
  text_my_wallet = ["My Wallet", "المحفظة "]
  text_search1 = ["Search here..", "ابحث هنا . . "]
  text_total_amt = ["Total amount", "المبلغ الإجمالي "]
  text_notification = ["Notifications", "تنبيهات "]
  text_searc = ["Search", "البحث "]
  text_filter = ["Filter", "تصفية "]
  text_price_up = ["Price up", "السعر من الأعلى "]
  text_price_down = ["Price down", "السعر من الأقل "]
  text_rating_up = ["Rating up", "التقييم الأعلى "]
  text_rating_down = ["Rating down", "التقييم الأدنى "]
  text_city_near_by = ["City near by", "الاقرب لموقعي "]
  text_city_near_by1 = ["City far away", "الأبعد لموقعي "]
  text_Boat_size = ["Boat size  small to large", "حجم القارب من الأصغر الى الأكبر "]
  text_Boat_size1 = ["Boat size large to small", "حجم القارب من الأكبر الى الأصغر "]
  text_max_guest = ["Max geust", "اقصى عدد ركاب "]
  text_clear = ["Clear", "امسح "]
  text_filtered_data = ["Filtered Data", "تصفية حسب التاريخ "]
  text_search_data = ["Searched Data", "بحث حسب التاريخ "]
  text_seccess_msg = ["You have successfully created Booking", "تم انشاء حجز بنجاح "]
  text_Booking_id = ["Booking id", "رقم الحجز "]
  text_Countibue = ["Continue", "متابعة "]
  text_my_trip = ["My trip", "رحلتي"]
  text_booking_date1 = ["Booking Date & Time", "تاريخ ووقت الحجز"]
  text_Please_Login_First = ["Please Login First", "الرجاء تسجيل الدخول أولا"]
  trip_not_found = ["Trip Not Found", "لم يتم العثور على الرحلة"]
  inbox_not_found = ["Inbox Not Found", "البريد الوارد غير موجود"]
  fav_not_found = ["Favourite Not Found", "المفضلة غير موجودة"]
  payment_failed = ["Payment Failed", "عملية الدفع فشلت"]
  KWD_txt  = ["KWD",' د.ك']
  to_txt  = ["to",'ل']
  select_date  = ["Please Select Date",'Please Select Date']
  enter_guest  = ["Please Enter Guest",'Please Enter Guest']
  owner_not_avail=["Boat not available. Please select another date","القارب غير متوفر . الرجاء اختيار تاريخ آخر"]
}
export const Lang_chg = new Language_provider();