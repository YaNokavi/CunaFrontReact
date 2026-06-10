import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";

import Layout from "../components/layout/Layout";
import FavoritePage from "../pages/FavoritePage";
import CoursePage from "../pages/CoursePage";
import ReviewsPage from "../pages/ReviewsPage";
import SyllabusPage from "../pages/SyllabusPage";
import StepPage from "../pages/StepPage";
import ProfilePage from "../pages/ProfilePage";

//TODO подумать над replace и посмотреть почему не стоит использовать вложенный роутинг
export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Navigate to="/favorite" replace />} />
      <Route path="favorite" element={<FavoritePage />} />
      <Route path="favorite/:courseId" element={<CoursePage />} />
      <Route path="favorite/:courseId/rating" element={<ReviewsPage />} />
      <Route path="favorite/:courseId/syllabus" element={<SyllabusPage />} />
      <Route
        path="favorite/:courseId/syllabus/:submoduleId/step/:stepNumber"
        element={<StepPageWithKey />}
      />

      <Route path="profile" element={<ProfilePage />} />
    </Route>,
  ),
  { basename: "/CunaFrontReact" },
);

// Обёртка чтобы передать key через useParams
import { useParams } from "react-router-dom";
function StepPageWithKey() {
  const { stepNumber, submoduleId } = useParams();
  return <StepPage key={`${submoduleId}-${stepNumber}`} />;
}
