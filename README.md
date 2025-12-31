/_--------------------------_/
#for treat with multiple image there are 2 ways
#first way by library (react-multiple-image-input)
here all info for it
https://github.com/codenaz/react-multiple-image-input
#second way by (map) such in colors
CompactPicker,react-color
/_--------------------------_/
/_react-color_/
/_--------------------------_/
/_react-select_/
/_--------------------------_/

1. مرحلة الانطلاق (The Component)المستخدم بيدخل البيانات في Form وبيدوس على "إضافة منتج". هنا الـ Component بيعمل dispatch للـ Thunk اللي إنت كريته:JavaScriptdispatch(createProduct(formData));
2. مرحلة الـ Middleware (The Thunk)بمجرد ما تعمل dispatch للـ createProduct الـ Thunk بيبدأ يشتغل ويمر بـ 3 حالات:حالة الـ Pending (انتظار): أول ما الـ Thunk يبدأ، بيبعت Action أوتوماتيك لـ Redux بيقوله "أنا بدأت، خلي الـ loading بـ true".داخل الـ Try block: الـ Thunk بينفذ الكود اللي كتبته insertData. هنا الـ JavaScript بتوقف (await) لحد ما الـ API يرد.3. مرحلة الـ API (Server Side)الطلب (Request) بيخرج من المتصفح يروح للسيرفر. السيرفر بيعالج البيانات، يخزنها في قاعدة البيانات، ويرد بـ Response (إما نجاح 201 أو فشل 400/500).4. مرحلة المعالجة (The Slice / Reducers)لما الـ API يرد، الـ Thunk بياخد النتيجة ويرجع للـ Slice:في حالة النجاح (Fulfilled): الـ Thunk بياخد الـ response اللي رجع من الـ API ويبعته كـ payload للـ Slice. الـ Slice بيقوم بتحديث الـ state.products بالبيانات الجديدة ويخلي الـ loading بـ false.في حالة الفشل (Rejected): لو حصل Error، الـ catch بتمسكه والـ Thunk بيبعت rejectWithValue. الـ Slice بياخد رسالة الخطأ دي ويحطها في الـ state.error.5. مرحلة التحديث النهائي (The UI)لأن الـ State اتغيرت في الـ Store، الـ Component اللي بيستخدم useSelector بيحس بالتغيير فوراً:الـ Spinner بيختفي (لأن loading بقى false).المنتج الجديد بيظهر في القائمة (لأن products اتحدثت).ملخص الخطوات في جدول بسيط:المرحلةالأداةالوظيفة1. TriggerComponentعمل dispatch للأكشن.2. RequestAsyncThunkتنفيذ الـ API Call وانتظار النتيجة.3. LogicSlice (ExtraReducers)استقبال البيانات وتحديث الـ State.4. UI UpdateSelectorإعادة رندر (Re-render) للصفحة بالبيانات الجديدة.
/**************/
npm install react-hook-form @hookform/resolvers zod
/********discount******/
الزرار ده بيتسمى CTA (Call To Action)، وهدفه الأساسي هو "تحويل الزائر لزبون".

بما إن القسم بيعرض خصم كبير (30%)، فالزرار ده هو "البوابة" اللي بتخلي المستخدم يستفيد من العرض فوراً قبل ما ينسى أو يكمل سكرول.

بيساعد في تنظيم حركة المرور (Traffic) جوه موقعك ويوجه الناس للأقسام اللي أنت عايز تبيع فيها أكتر (زي قسم اللاب توب حالياً).
/*****************/