import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import Layout from "../components/layout/Layout";
import FriendsPage from "../pages/FriendsPage";
import ExpertsPage from "../pages/ExpertsPage";
import CatalogPage from "../pages/CatalogPage";
import FavoritePage from "../pages/FavoritePage";
import ProfilePage from "../pages/ProfilePage";
import CoursePage from "../pages/CoursePage";
import SyllabusPage from "../pages/SyllabusPage";
import StepPage from "../pages/StepPage";
import ReviewsPage from "../pages/ReviewsPage";

//TODO подумать над replace и посмотреть почему не стоит использовать вложенный роутинг
export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Navigate to="/favorite" replace />} />
      <Route path="friends" element={<FriendsPage />} />
      <Route path="experts" element={<ExpertsPage />} />
      <Route path="catalog" element={<CatalogPage />} />
      <Route path="catalog/:courseId" element={<CoursePage />} />
      <Route path="catalog/:courseId/rating" element={<ReviewsPage />} />
      <Route path="catalog/:courseId/syllabus" element={<SyllabusPage />} />
      <Route
        path="catalog/:courseId/syllabus/:submoduleId/step/:stepNumber"
        element={<StepPage />}
      />
      <Route path="favorite" element={<FavoritePage />} />
      <Route path="favorite/:courseId" element={<CoursePage />} />
      <Route path="favorite/:courseId/rating" element={<ReviewsPage />} />
      <Route path="favorite/:courseId/syllabus" element={<SyllabusPage />} />
      <Route
        path="favorite/:courseId/syllabus/:submoduleId/step/:stepNumber"
        element={<StepPage />}
      />
      <Route path="profile" element={<ProfilePage />} />
    </Route>,
  ),
);
