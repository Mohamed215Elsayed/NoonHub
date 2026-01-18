import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { useNavigate } from 'react-router-dom';

import avatarPlaceholder from '../../Assets/Images/avatar.png';
import coverPlaceholder from '../../Assets/Images/cover-placeholder.jpg';
import {
  changeUserPassword,
  logoutUser,
  selectAuth,
  updateUserProfile,
} from '../../Features/Auth/AuthSlice';
import notify from '../useNotifaction';

const ProfileHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(selectAuth);
  // console.log(user)
  // Profile States
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [profileImg, setProfileImg] = useState(null);
  const [profilePreview, setProfilePreview] = useState(user?.profileImg || avatarPlaceholder);
  const [coverImg, setCoverImg] = useState(null);
  const [coverPreview, setCoverPreview] = useState(user?.coverImg || coverPlaceholder);

  // تحديث البيانات المحلية عند تغيير المستخدم في الـ Store
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone || "");
      setProfilePreview(user.profileImg || avatarPlaceholder);
      setCoverPreview(user.coverImg || coverPlaceholder);
    }
  }, [user]);

  const handleImageChange = useCallback((e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      notify("من فضلك اختر صورة فقط", "warn");
      e.target.value = null;
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      notify("حجم الصورة يجب ألا يزيد عن 2MB", "warn");
      e.target.value = null;
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (type === "profile") {
        setProfileImg(file);
        setProfilePreview(reader.result);
      } else {
        setCoverImg(file);
        setCoverPreview(reader.result);
      }
    };

    reader.readAsDataURL(file);
  }, []);


  const submitProfile = async () => {
    const formData = new FormData();
    if (
      name === user.name &&
      email === user.email &&
      phone === user.phone &&
      !profileImg &&
      !coverImg
    ) {
      return notify("لم يتم تعديل أي بيانات", "info");
    }

    formData.append("name", name);
    formData.append("phone", phone);
    if (email !== user.email) formData.append("email", email);
    if (profileImg) formData.append("profileImg", profileImg);
    if (coverImg) formData.append("coverImg", coverImg);

    const res = await dispatch(updateUserProfile(formData));
    if (res.meta.requestStatus === "fulfilled") {
      notify("تم تحديث البيانات بنجاح", "success");
      setProfileImg(null);
      setCoverImg(null);
      return true;
    }
    else {
      notify(res.payload?.message || res.payload?.data || "فشل تحديث البيانات", "error");
      return false;
    }
  };

  // Password States
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const submitPassword = async (e) => {
    if (e) e.preventDefault();
    if (!oldPassword || !newPassword || !confirmPassword) {
      return notify("من فضلك أكمل جميع الحقول", "warn");
    }

    if (newPassword !== confirmPassword) return notify("كلمات المرور غير متطابقة", "warn");

    const res = await dispatch(changeUserPassword({
      currentPassword: oldPassword,
      password: newPassword,
      passwordConfirm: confirmPassword,
    }));

    if (res.meta.requestStatus === "fulfilled") {
      notify("تم تغيير كلمة المرور بنجاح، يرجى تسجيل الدخول مجدداً", "success");
      setTimeout(() => {
        // localStorage.clear();
        dispatch(logoutUser());
        navigate("/login", { replace: true });
        // window.location.reload();
      }, 2000);
    }
  };
  /*============================*/

  const [isEditing, setIsEditing] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState("");

  const handleUpdate = async () => {
  setLoadingAction(true);
  const success = await submitProfile();
  setLoadingAction(false);
  if (success) {
    setIsEditing(false);
  }
};

  const openImage = (img) => {
    setModalImg(img);
    setShowModal(true);
  };
  const cancelEdit = () => {
  setName(user.name);
  setEmail(user.email);
  setPhone(user.phone || "");
  setProfilePreview(user.profileImg || avatarPlaceholder);
  setCoverPreview(user.coverImg || coverPlaceholder);
  setProfileImg(null);
  setCoverImg(null);
  setIsEditing(false);
};

  /*==================================*/

  return {
    user, name, setName, email, setEmail, phone, setPhone,
    profilePreview, coverPreview, handleImageChange,//submitProfile,
    oldPassword, setOldPassword, newPassword, setNewPassword,
    confirmPassword, setConfirmPassword, submitPassword,
    showOldPassword, setShowOldPassword, showNewPassword, setShowNewPassword,
    showConfirmPassword, setShowConfirmPassword,
    isEditing, setIsEditing, loadingAction, showModal, setShowModal, modalImg, handleUpdate, openImage,cancelEdit
  };
};

export default ProfileHook;