import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "@/components/LocaleLink";
import { useTranslation } from "react-i18next";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import {
  BookOpen,
  Layers,
  ClipboardList,
  Settings as Cog,
  Calendar,
  FileText,
  HelpCircle,
  Building,
  Search,
  ChevronRight,
  AlertCircle,
  Menu,
  X,
  ArrowUp,
} from "lucide-react";
/* ===========================
   Navigation Tree Structure
   =========================== */
interface NavItem {
  id: string;
  number: string;
  title: string;
  content?: React.ReactNode;
  children?: NavItem[];
}

const getNavigationTree = (t: any): NavItem[] => [
  {
    id: "about",
    number: "1",
    title: t("manual.about_title"),
    content: (
      <>
        <p className="text-slate-700 leading-relaxed mb-4">
          {t("manual.about_p1")}
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          {t("manual.about_p2")}
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          {t("manual.about_p3")}
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          {t("manual.about_p4")}
        </p>
        <p className="text-slate-700 leading-relaxed mb-6">
          {t("manual.about_p5")}
        </p>

        <h3 className="text-lg font-semibold text-slate-800 mb-3">
          {t("manual.key_features")}
        </h3>
        <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
          <li>
            <strong>{t("manual.operating_system")}</strong>{" "}
            {t("manual.feature_os_desc")}
          </li>
          <li>
            <strong>{t("manual.erase_files_and_folders")}</strong>{" "}
            {t("manual.feature_erase_files_desc")}
          </li>
          <li>
            <strong>{t("manual.erase_free_space")}</strong>{" "}
            {t("manual.feature_free_space_desc")}
          </li>
          <li>
            <strong>{t("manual.setting_schedule_erasure")}</strong>{" "}
            {t("manual.feature_schedule_desc")}
          </li>
          <li>
            <strong>{t("manual.generate_and_save_reports")}</strong>{" "}
            {t("manual.feature_reports_desc")}
          </li>
          <li>
            <strong>{t("manual.report_settings")}</strong>{" "}
            {t("manual.feature_report_settings_desc")}
          </li>
          <li>
            <strong>{t("manual.search_report")}</strong>{" "}
            {t("manual.feature_search_report_desc")}
          </li>
          <li>
            <strong>{t("manual.preview_report")}</strong>{" "}
            {t("manual.feature_preview_desc")}
          </li>
          <li>
            <strong>{t("manual.save_report_to_dsecure_cloud")}</strong>{" "}
            {t("manual.feature_cloud_desc")}
          </li>
          <li>
            <strong>
              {t("manual.supported_erasure_standards_and_verification")}
            </strong>{" "}
            {t("manual.feature_standards_desc")}
          </li>
          <li>
            <strong>{t("manual.search_and_erase")}</strong>{" "}
            {t("manual.feature_search_erase_desc")}
          </li>
          <li>
            <strong>{t("manual.supports_multiple_themes")}</strong>{" "}
            {t("manual.feature_themes_desc")}
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "guide",
    number: "2",
    title: t("manual.guide_title"),
    content: (
      <>
        <p className="text-slate-700 leading-relaxed mb-6">
          {t("manual.guide_p1")}
        </p>
        <ol className="list-decimal list-inside space-y-2 text-slate-700 ml-4 mb-6">
          <li>
            <strong>{t("manual.about_dsecure_file_eraser")}</strong>
          </li>
          <li>
            <strong>{t("manual.about_the_guide")}</strong>
          </li>
          <li>
            <strong>{t("manual.getting_started")}</strong>
          </li>
          <li>
            <strong>{t("manual.working_with_dsecure_file_eraser")}</strong>
          </li>
          <li>
            <strong>{t("manual.frequently_asked_questions_faqs")}</strong>
          </li>
          <li>
            <strong>{t("manual.about_dsecure")}</strong>
          </li>
        </ol>
        <p className="text-slate-700 leading-relaxed mb-4">
          {t("manual.guide_p2")}
        </p>
        <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-6">
          <li>{t("manual.guide_feature1")}</li>
          <li>{t("manual.guide_feature2_1")}</li>
        </ul>
        <p className="text-slate-700 leading-relaxed">{t("manual.guide_p3")}</p>
      </>
    ),
  },
  {
    id: "getting-started",
    number: "3",
    title: t("manual.getting_started_title"),
    children: [
      {
        id: "installation",
        number: "3.1",
        title: t("manual.install_title"),
        content: (
          <>
            <p className="text-slate-700 leading-relaxed mb-6">
              {t("manual.install_intro")}
            </p>
            <div className="space-y-6">
              <div>
                <p className="text-slate-700 leading-relaxed">
                  <strong>{t("manual.install_step1_title")}</strong>{" "}
                  {t("manual.install_step1_desc")}
                </p>
              </div>
              <div>
                <p className="text-slate-700 leading-relaxed">
                  <strong>{t("manual.install_step2_title")}</strong>{" "}
                  {t("manual.install_step2_desc")}
                </p>
              </div>
              <div>
                <p className="text-slate-700 leading-relaxed">
                  <strong>{t("manual.install_step3_title")}</strong>{" "}
                  {t("manual.install_step3_desc")}
                </p>
              </div>
              <div>
                <p className="text-slate-700 leading-relaxed">
                  <strong>{t("manual.install_step4_title")}</strong>{" "}
                  {t("manual.install_step4_desc")}
                </p>
              </div>
              <div>
                <p className="text-slate-700 leading-relaxed">
                  <strong>{t("manual.install_step5_title")}</strong>{" "}
                  {t("manual.install_step5_desc")}
                </p>
              </div>
            </div>
          </>
        ),
      },
      {
        id: "disk-access",
        number: "3.2",
        title: t("manual.disk_access_title"),
        content: (
          <>
            <p className="text-slate-700 leading-relaxed mb-6">
              {t("manual.disk_access_intro")}
            </p>
            <h4 className="text-base font-semibold text-slate-800 mt-8 mb-4">
              {t("manual.disk_access_macos_new")}
            </h4>
            <p className="text-slate-600 text-sm mb-6 italic">
              {t("manual.disk_access_macos_new_note")}
            </p>
            <div className="space-y-6">
              <div>
                <p className="text-slate-700 mb-3">
                  <strong>1.</strong> {t("manual.disk_access_step1")}
                </p>
              </div>
              <div>
                <p className="text-slate-700 mb-3">
                  <strong>2.</strong> {t("manual.disk_access_step2")}
                </p>
              </div>
              <div>
                <p className="text-slate-700 mb-3">
                  <strong>3.</strong> {t("manual.disk_access_step3")}
                </p>
              </div>
              <div>
                <p className="text-slate-700 mb-3">
                  <strong>4.</strong> {t("manual.disk_access_step4")}
                </p>
              </div>
            </div>
            <h4 className="text-base font-semibold text-slate-800 mt-10 mb-4">
              {t("manual.disk_access_macos_old")}
            </h4>
            <p className="text-slate-600 text-sm mb-6 italic">
              {t("manual.disk_access_macos_old_note")}
            </p>
            <div className="space-y-6">
              <div>
                <p className="text-slate-700 mb-3">
                  <strong>1.</strong> {t("manual.disk_access_old_step1")}
                </p>
              </div>
              <div>
                <p className="text-slate-700 mb-3">
                  <strong>2.</strong> {t("manual.disk_access_old_step2")}
                </p>
              </div>
              <div>
                <p className="text-slate-700 mb-3">
                  <strong>3.</strong> {t("manual.disk_access_old_step3")}
                </p>
              </div>
              <div>
                <p className="text-slate-700 mb-3">
                  <strong>4.</strong> {t("manual.disk_access_old_step4")}
                </p>
              </div>
              <div>
                <p className="text-slate-700 mb-3">
                  <strong>5.</strong> {t("manual.disk_access_old_step5")}
                </p>
              </div>
            </div>
          </>
        ),
      },
      {
        id: "user-interface",
        number: "3.3",
        title: t("manual.ui_title"),
        children: [
          {
            id: "tabs-buttons",
            number: "3.3.1",
            title: t("manual.tabs_buttons_title"),
            content: (
              <>
                <p className="text-slate-700 leading-relaxed mb-4">
                  {t("manual.tabs_buttons_desc")}
                </p>
                <h4 className="text-base font-semibold text-slate-800 mt-8 mb-4">
                  {t("manual.navbar_icons")}
                </h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-slate-700 mb-2">
                      <strong>{t("manual.info_icon")}</strong>{" "}
                      {t("manual.info_icon_desc")}
                    </p>
                    <img
                      src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772032271/dsecure-manual/01_Navbar_Icons/1_navbar_info.png"
                      alt={t("manual.navbar_info_icon")}
                      className="w-full mb-4"
                      style={{ borderRadius: "3%" }}
                    />
                  </div>
                  <div>
                    <p className="text-slate-700 mb-2">
                      <strong>{t("manual.support_documentation")}</strong>{" "}
                      {t("manual.support_doc_desc")}
                    </p>
                    <img
                      src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772032360/dsecure-manual/01_Navbar_Icons/2_Support_and_Documantation.png"
                      alt={t("manual.support_and_documentation")}
                      className="w-full mb-4"
                      style={{ borderRadius: "3%" }}
                    />
                  </div>
                  <div>
                    <p className="text-slate-700 mb-2">
                      <strong>{t("manual.software_update")}</strong>{" "}
                      {t("manual.software_update_desc")}
                    </p>
                    <img
                      src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772032448/dsecure-manual/01_Navbar_Icons/3_Software_update.png"
                      alt={t("manual.software_update_1")}
                      className="w-full mb-4"
                      style={{ borderRadius: "3%" }}
                    />
                  </div>
                  <div>
                    <p className="text-slate-700 mb-2">
                      <strong>{t("manual.help_manual")}</strong>{" "}
                      {t("manual.help_manual_desc")}
                    </p>
                    <img
                      src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772032536/dsecure-manual/01_Navbar_Icons/4_help_manual.png"
                      alt={t("manual.help_manual_1")}
                      className="w-full mb-4"
                      style={{ borderRadius: "3%" }}
                    />
                  </div>
                </div>

                <h4 className="text-base font-semibold text-slate-800 mt-8 mb-4">
                  {t("manual.dashboard_overview")}
                </h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-slate-700 mb-2">
                      <strong>{t("manual.dashboard_view")}</strong>{" "}
                      {t("manual.dashboard_view_desc")}
                    </p>
                    <img
                      src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772032712/dsecure-manual/02_Dashboard/dashboard.png"
                      alt={t("manual.dashboard")}
                      className="w-full mb-4"
                      style={{ borderRadius: "3%" }}
                    />
                  </div>
                  <div>
                    <p className="text-slate-700 mb-2">
                      <strong>{t("manual.dashboard_details")}</strong>{" "}
                      {t("manual.dashboard_details_desc")}
                    </p>
                    <img
                      src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772032624/dsecure-manual/02_Dashboard/dashboard-2.png"
                      alt={t("manual.dashboard_details_1")}
                      className="w-full mb-4"
                      style={{ borderRadius: "3%" }}
                    />
                  </div>
                </div>
              </>
            ),
          },
        ],
      },
      {
        id: "ordering",
        number: "3.4",
        title: t("manual.ordering_title"),
        content: (
          <>
            <p className="text-slate-700 leading-relaxed mb-4">
              {t("manual.ordering_know_more")}{" "}
              <Link to="/products" className="text-blue-600 hover:underline">
                {t("manual.ordering_here")}
              </Link>
              .
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              {t("manual.ordering_purchase")}{" "}
              <Link
                to="/pricing-and-plan?product=file-eraser"
                className="text-blue-600 hover:underline"
              >
                {t("manual.ordering_here")}
              </Link>
              .
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              {t("manual.ordering_buy_online")}
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              {t("manual.ordering_select_method")}
            </p>
            <p className="text-slate-700 leading-relaxed">
              {t("manual.ordering_activation_key")}
            </p>
          </>
        ),
      },
      {
        id: "activating",
        number: "3.5",
        title: t("manual.activating_title"),
        content: (
          <>
            <p className="text-slate-700 leading-relaxed mb-4">
              {t("manual.activating_intro")}
            </p>
            <ol className="list-decimal list-inside space-y-4 text-slate-700 ml-4">
              <li className="mb-4">
                <span className="font-medium">
                  <strong>{t("manual.access_and_cloud_login")} </strong>
                  {t("manual.activating_cloud_login_desc")}
                </span>
              </li>
              <li className="mb-4">
                <span className="font-medium">
                  <strong>{t("manual.online_activation")}</strong>{" "}
                  {t("manual.activating_online_desc")}
                </span>
              </li>
              <li className="mb-4">
                <span className="font-medium">
                  <strong>{t("manual.offline_activation")}</strong>{" "}
                  {t("manual.activating_offline_desc")}
                </span>
              </li>
              <li className="mb-4">
                <span className="font-medium">
                  {t("manual.activating_offline2_desc")}
                </span>
              </li>
              <li className="mb-4">
                <span className="font-medium">
                  {t("manual.activating_offline3_desc")}
                </span>
              </li>
            </ol>
          </>
        ),
      },
      {
        id: "updating",
        number: "3.6",
        title: t("manual.updating_title"),
        content: (
          <>
            <p className="text-slate-700 leading-relaxed mb-4">
              {t("manual.updating_desc")}
            </p>
            <img
              src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772032448/dsecure-manual/01_Navbar_Icons/3_Software_update.png"
              alt={t("manual.software_update_1")}
              className="w-full mb-6"
              style={{ borderRadius: "3%" }}
            />
          </>
        ),
      },
      {
        id: "contact",
        number: "3.7",
        title: t("manual.contact_title"),
        content: (
          <div className="text-slate-700 leading-relaxed">
            <p className="mb-2">
              <strong>{t("manual.email")}</strong> support@dsecuretech.com
            </p>
            <p className="mb-2">
              <strong>{t("manual.website")}</strong> www.dsecuretech.com
            </p>
            <p>
              <strong>{t("manual.support_hours")}</strong>{" "}
              {t("manual.contact_support_hours_value")}
            </p>
          </div>
        ),
      },
    ],
  },
  {
    id: "working",
    number: "4",
    title: t("manual.working_with_dsecure_file_eraser"),
    children: [
      {
        id: "erase-files",
        number: "4.1",
        title: t("manual.erase_files_title"),
        content: (
          <>
            <p className="text-slate-700 leading-relaxed mb-6">
              {t("manual.erase_files_intro")}
            </p>
            <div className="space-y-6">
              <div>
                <p className="text-slate-700 mb-3">
                  <strong>1.</strong>{" "}
                  <strong> {t("manual.access_file_erasure_mode")} </strong>{" "}
                  {t("manual.erase_files_step1_desc")}
                </p>
              </div>
              <div>
                <p className="text-slate-700 mb-3">
                  <strong>2.</strong>{" "}
                  <strong>
                    {" "}
                    {t("manual.select_files_or_folders_manually")}{" "}
                  </strong>{" "}
                  {t("manual.erase_files_step2_desc")}
                </p>
              </div>
              <div>
                <p className="text-slate-700 mb-3">
                  <strong>3.</strong>{" "}
                  <strong> {t("manual.review_the_erasure_list")} </strong>{" "}
                  {t("manual.erase_files_step3_desc")}
                </p>
              </div>
              <div>
                <p className="text-slate-700 mb-3">
                  <strong>4.</strong>{" "}
                  <strong> {t("manual.initiate_erasure")} </strong>{" "}
                  {t("manual.erase_files_step4_desc")}
                </p>
              </div>
              <div>
                <p className="text-slate-700 mb-3">
                  <strong>5.</strong>{" "}
                  <strong> {t("manual.erase_files_step5_title")} </strong>{" "}
                  {t("manual.erase_files_step5_desc")}
                </p>
              </div>
              <div>
                <p className="text-slate-700 mb-3">
                  <strong>6.</strong>{" "}
                  <strong>
                    {" "}
                    {t("manual.erasure_process_and_monitoring")}{" "}
                  </strong>{" "}
                  {t("manual.erase_files_step6_desc")}
                </p>
              </div>
              <div>
                <p className="text-slate-700 mb-3">
                  <strong>7.</strong>{" "}
                  <strong> {t("manual.review_file_erasure_summary")} </strong>{" "}
                  {t("manual.erase_files_step7_desc")}
                </p>
              </div>
            </div>

            <h4 className="text-base font-semibold text-slate-800 mt-8 mb-4">
              {t("manual.erase_files_folders_product_screenshots")}
            </h4>
            <div className="space-y-4">
              <div>
                <img
                  src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772032888/dsecure-manual/03_Erase_Files_And_Folder/EFF-1.png"
                  alt={t("manual.erase_files_and_folders_step_1")}
                  className="w-full mb-4"
                  style={{ borderRadius: "3%" }}
                />
              </div>
              <div>
                <img
                  src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772032800/dsecure-manual/03_Erase_Files_And_Folder/EEF-2.png"
                  alt={t("manual.erase_files_and_folders_step_2")}
                  className="w-full mb-4"
                  style={{ borderRadius: "3%" }}
                />
              </div>
              <div>
                <img
                  src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772032978/dsecure-manual/03_Erase_Files_And_Folder/EFF-3.png"
                  alt={t("manual.erase_files_and_folders_step_3")}
                  className="w-full mb-4"
                  style={{ borderRadius: "3%" }}
                />
              </div>
            </div>
          </>
        ),
      },
      {
        id: "erase-space",
        number: "4.2",
        title: t("manual.erase_space_title"),
        content: (
          <>
            <p className="text-slate-700 leading-relaxed mb-6">
              {t("manual.erase_space_intro")}
            </p>
            <div className="space-y-6">
              <div>
                <p className="text-slate-700 leading-relaxed">
                  {t("manual.erase_space_select_volume")}
                </p>
              </div>
              <div>
                <p className="text-slate-700 leading-relaxed">
                  {t("manual.erase_space_locked")}
                </p>
              </div>
              <div>
                <p className="text-slate-700 leading-relaxed">
                  {t("manual.erase_space_confirm")}
                </p>
              </div>
              <div>
                <p className="text-slate-700 leading-relaxed">
                  {t("manual.erase_space_wipe")}
                </p>
              </div>
              <div>
                <p className="text-slate-700 leading-relaxed">
                  {t("manual.erase_space_monitor")}
                </p>
              </div>
              <div>
                <p className="text-slate-700 leading-relaxed">
                  {t("manual.erase_space_finalizing")}
                </p>
              </div>
              <div>
                <p className="text-slate-700 leading-relaxed">
                  {t("manual.erase_space_complete")}
                </p>
              </div>
              <div>
                <p className="text-slate-700 leading-relaxed">
                  {t("manual.erase_space_summary")}
                </p>
              </div>
              <div>
                <p className="text-slate-700 leading-relaxed">
                  {t("manual.erase_space_reformat")}
                </p>
              </div>
              <div>
                <p className="text-slate-700 leading-relaxed">
                  {t("manual.erase_space_format")}
                </p>
              </div>
              <div>
                <p className="text-slate-700 leading-relaxed">
                  {t("manual.erase_space_format_done")}
                </p>
              </div>
            </div>

            <h4 className="text-base font-semibold text-slate-800 mt-8 mb-4">
              {t("manual.volume_eraser_product_screenshots")}
            </h4>
            <div className="space-y-4">
              <div>
                <p className="text-slate-700 mb-2">
                  <strong>{t("manual.volume_eraser_select_volume")}</strong>{" "}
                  {t("manual.volume_select_desc")}
                </p>
                <img
                  src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772033065/dsecure-manual/04_Volume_Eraser/VE-1.png"
                  alt={t("manual.volume_eraser_select_volume_1")}
                  className="w-full mb-4"
                  style={{ borderRadius: "3%" }}
                />
              </div>
              <div>
                <p className="text-slate-700 mb-2">
                  <strong>{t("manual.volume_eraser_confirm_erasure")}</strong>{" "}
                  {t("manual.volume_confirm_desc")}
                </p>
                <img
                  src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772033153/dsecure-manual/04_Volume_Eraser/VE-2.png"
                  alt={t("manual.volume_eraser_confirm_erasure_1")}
                  className="w-full mb-4"
                  style={{ borderRadius: "3%" }}
                />
              </div>
              <div>
                <p className="text-slate-700 mb-2">
                  <strong>{t("manual.volume_eraser_progress")}</strong>{" "}
                  {t("manual.volume_progress_desc")}
                </p>
                <img
                  src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772033241/dsecure-manual/04_Volume_Eraser/VE-3.png"
                  alt={t("manual.volume_eraser_progress_1")}
                  className="w-full mb-4"
                  style={{ borderRadius: "3%" }}
                />
              </div>
              <div>
                <p className="text-slate-700 mb-2">
                  <strong>{t("manual.volume_eraser_complete")}</strong>{" "}
                  {t("manual.volume_complete_desc")}
                </p>
                <img
                  src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772033329/dsecure-manual/04_Volume_Eraser/VE-4.png"
                  alt={t("manual.volume_eraser_complete_1")}
                  className="w-full mb-4"
                  style={{ borderRadius: "3%" }}
                />
              </div>
            </div>

            <h4 className="text-base font-semibold text-slate-800 mt-8 mb-4">
              {t("manual.deleted_data_eraser_product_screenshots")}
            </h4>
            <div className="space-y-4">
              <div>
                <p className="text-slate-700 mb-2">
                  <strong>
                    {t("manual.deleted_data_eraser_select_drive")}
                  </strong>{" "}
                  {t("manual.deleted_data_select_desc")}
                </p>
                <img
                  src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772033417/dsecure-manual/05_Deleted_Data_Eraser/DDE-1.png"
                  alt={t("manual.deleted_data_eraser_select_drive_1")}
                  className="w-full mb-4"
                  style={{ borderRadius: "3%" }}
                />
              </div>
              <div>
                <p className="text-slate-700 mb-2">
                  <strong>{t("manual.deleted_data_eraser_scanning")}</strong>{" "}
                  {t("manual.deleted_data_scanning_desc")}
                </p>
                <img
                  src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772033505/dsecure-manual/05_Deleted_Data_Eraser/DDE-2.png"
                  alt={t("manual.deleted_data_eraser_scanning_1")}
                  className="w-full mb-4"
                  style={{ borderRadius: "3%" }}
                />
              </div>
              <div>
                <p className="text-slate-700 mb-2">
                  <strong>{t("manual.deleted_data_eraser_erasing")}</strong>{" "}
                  {t("manual.deleted_data_erasing_desc")}
                </p>
                <img
                  src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772033593/dsecure-manual/05_Deleted_Data_Eraser/DDE-3.png"
                  alt={t("manual.deleted_data_eraser_erasing_1")}
                  className="w-full mb-4"
                  style={{ borderRadius: "3%" }}
                />
              </div>
              <div>
                <p className="text-slate-700 mb-2">
                  <strong>{t("manual.deleted_data_eraser_complete")}</strong>{" "}
                  {t("manual.deleted_data_complete_desc")}
                </p>
                <img
                  src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772033680/dsecure-manual/05_Deleted_Data_Eraser/DDE-4.png"
                  alt={t("manual.deleted_data_eraser_complete_1")}
                  className="w-full mb-4"
                  style={{ borderRadius: "3%" }}
                />
              </div>
            </div>
          </>
        ),
      },
      {
        id: "cloud-storage",
        number: "4.3",
        title: t("manual.cloud_storage_title"),
        content: (
          <>
            <p className="text-slate-700 leading-relaxed mb-6">
              {t("manual.cloud_storage_intro")}
            </p>
            <div className="space-y-6">
              <div>
                <p className="text-slate-700 mb-3">
                  <strong>1.</strong> {t("manual.cloud_step1")}
                </p>
                <p className="text-slate-600 text-sm mb-3 italic">
                  {t("manual.cloud_step1_note")}
                </p>
              </div>

              <div>
                <p className="text-slate-700 mb-3">
                  <strong>2.</strong> {t("manual.cloud_step2")}
                </p>
                <p className="text-slate-600 text-sm mb-3">
                  {t("manual.cloud_step2_desc")}
                </p>
              </div>

              <div>
                <p className="text-slate-700 mb-3">
                  <strong>3.</strong> {t("manual.cloud_step3")}
                </p>
                <p className="text-slate-600 text-sm mb-3">
                  {t("manual.cloud_step3_desc")}
                </p>
              </div>

              <div>
                <p className="text-slate-700 mb-3">
                  <strong>4.</strong> {t("manual.cloud_step4")}
                </p>
                <p className="text-slate-600 text-sm mb-3">
                  {t("manual.cloud_step4_desc")}
                </p>
              </div>

              <div>
                <p className="text-slate-700 mb-3">
                  <strong>5.</strong> {t("manual.cloud_step5")}
                </p>
                <p className="text-slate-600 text-sm mb-3">
                  {t("manual.cloud_step5_desc")}
                </p>
              </div>

              <div>
                <p className="text-slate-700 mb-3">
                  <strong>6.</strong> {t("manual.cloud_step6")}
                </p>
                <p className="text-slate-600 text-sm mb-3">
                  {t("manual.cloud_step6_desc")}
                </p>
              </div>

              <div>
                <p className="text-slate-700 mb-3">
                  <strong>6.1</strong> {t("manual.cloud_step6_1")}
                </p>
                <p className="text-slate-600 text-sm mb-3">
                  {t("manual.cloud_step6_1_desc")}
                </p>
              </div>

              <div>
                <p className="text-slate-700 mb-3">
                  <strong>6.2</strong> {t("manual.cloud_step6_2")}
                </p>
                <p className="text-slate-600 text-sm mb-3">
                  {t("manual.cloud_step6_2_desc")}
                </p>
              </div>

              <div>
                <p className="text-slate-700 mb-3">
                  <strong>7.</strong> {t("manual.cloud_step7")}
                </p>
                <p className="text-slate-600 text-sm mb-3">
                  {t("manual.cloud_step7_desc")}
                </p>
              </div>

              <div>
                <p className="text-slate-700 mb-3">
                  <strong>7.1</strong> {t("manual.cloud_step7_1")}
                </p>
                <p className="text-slate-600 text-sm mb-3">
                  {t("manual.cloud_step7_1_desc")}
                </p>
              </div>

              <div>
                <p className="text-slate-700 mb-3">
                  <strong>8.</strong> {t("manual.cloud_step8")}
                </p>
                <p className="text-slate-600 text-sm mb-3">
                  {t("manual.cloud_step8_desc")}
                </p>
              </div>

              <div>
                <p className="text-slate-700 mb-3">
                  <strong>9.</strong> {t("manual.cloud_step9")}
                </p>
                <p className="text-slate-600 text-sm mb-3">
                  {t("manual.cloud_step9_desc")}
                </p>
              </div>

              <div>
                <p className="text-slate-700 mb-3">
                  <strong>9.1.</strong> {t("manual.cloud_step9_1")}
                </p>
                <p className="text-slate-600 text-sm mb-3">
                  {t("manual.cloud_step9_1_desc")}
                </p>
              </div>

              <div>
                <p className="text-slate-700 mb-3">
                  <strong>10.</strong> {t("manual.cloud_step10")}
                </p>
                <p className="text-slate-600 text-sm mb-3">
                  {t("manual.cloud_step10_desc")}
                </p>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6">
                <p className="text-blue-900 font-semibold mb-2">
                  {t("manual.important_notes")}
                </p>
                <ul className="list-disc list-inside space-y-1 text-blue-800 text-sm">
                  <li>
                    {t("manual.cloud_note1")}
                  </li>
                  <li>
                    {t("manual.this_feature_requires_an_active_internet_conn")}
                  </li>
                  <li>
                    {t("manual.google_drive_authorization_is_required_for_fi")}
                  </li>
                  <li>
                    {t("manual.erasure_reports_are_generated_for_cloud_stora")}
                  </li>
                </ul>
              </div>
            </div>

            <h4 className="text-base font-semibold text-slate-800 mt-8 mb-4">
              {t("manual.cloud_erase_product_screenshots")}
            </h4>
            <div className="space-y-4">
              <div>
                <p className="text-slate-700 mb-2">
                  <strong>{t("manual.cloud_erase_main_interface")}</strong>{" "}
                  {t("manual.cloud_screenshot1_desc")}
                </p>
                <img
                  src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772034384/dsecure-manual/08_Cloud_Erase/0.png"
                  alt={t("manual.cloud_erase_main_interface_1")}
                  className="w-full mb-4"
                  style={{ borderRadius: "3%" }}
                />
              </div>
              <div>
                <p className="text-slate-700 mb-2">
                  <strong>{t("manual.cloud_erase_connect_account")}</strong>{" "}
                  {t("manual.cloud_screenshot2_desc")}
                </p>
                <img
                  src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772034471/dsecure-manual/08_Cloud_Erase/1.png"
                  alt={t("manual.cloud_erase_connect_account_1")}
                  className="w-full mb-4"
                  style={{ borderRadius: "3%" }}
                />
              </div>
              <div>
                <p className="text-slate-700 mb-2">
                  <strong>
                    {t("manual.cloud_erase_file_folder_erase_confirmation")}
                  </strong>{" "}
                  {t("manual.confirm_the_cloud_file_and_folder_erasure_ope")}
                </p>
                <img
                  src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/dsecure-manual/08_Cloud_Erase/2_cloude_file_folder_Erase_conform"
                  alt={t("manual.cloud_erase_file_folder_erase_confirmation_1")}
                  className="w-full mb-4"
                  style={{ borderRadius: "3%" }}
                />
              </div>
              <div>
                <p className="text-slate-700 mb-2">
                  <strong>
                    {t("manual.cloud_erase_file_folder_erase_progress")}
                  </strong>{" "}
                  {t("manual.monitor_the_cloud_file_and_folder_erasure_pro")}
                </p>
                <img
                  src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/dsecure-manual/08_Cloud_Erase/3_cloud_erase_file_folder_erase_progress"
                  alt={t("manual.cloud_erase_file_folder_erase_progress_1")}
                  className="w-full mb-4"
                  style={{ borderRadius: "3%" }}
                />
              </div>
              <div>
                <p className="text-slate-700 mb-2">
                  <strong>{t("manual.cloud_erase_browse_files")}</strong>{" "}
                  {t("manual.cloud_screenshot5_desc")}
                </p>
                <img
                  src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772035263/dsecure-manual/08_Cloud_Erase/5.png"
                  alt={t("manual.cloud_erase_browse_files_1")}
                  className="w-full mb-4"
                  style={{ borderRadius: "3%" }}
                />
              </div>
              <div>
                <p className="text-slate-700 mb-2">
                  <strong>{t("manual.cloud_erase_select_items")}</strong>{" "}
                  {t("manual.cloud_screenshot6_desc")}
                </p>
                <img
                  src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772035353/dsecure-manual/08_Cloud_Erase/6.png"
                  alt={t("manual.cloud_erase_select_items_1")}
                  className="w-full mb-4"
                  style={{ borderRadius: "3%" }}
                />
              </div>
              <div>
                <p className="text-slate-700 mb-2">
                  <strong>{t("manual.cloud_erase_confirm_selection")}</strong>{" "}
                  {t("manual.cloud_screenshot7_desc")}
                </p>
                <img
                  src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772035441/dsecure-manual/08_Cloud_Erase/7.png"
                  alt={t("manual.cloud_erase_confirm_selection_1")}
                  className="w-full mb-4"
                  style={{ borderRadius: "3%" }}
                />
              </div>
              <div>
                <p className="text-slate-700 mb-2">
                  <strong>{t("manual.cloud_erase_erasure_progress")}</strong>{" "}
                  {t("manual.cloud_screenshot8_desc")}
                </p>
                <img
                  src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772035530/dsecure-manual/08_Cloud_Erase/8.png"
                  alt={t("manual.cloud_erase_erasure_progress_1")}
                  className="w-full mb-4"
                  style={{ borderRadius: "3%" }}
                />
              </div>
              <div>
                <p className="text-slate-700 mb-2">
                  <strong>{t("manual.cloud_erase_processing")}</strong>{" "}
                  {t("manual.cloud_screenshot9_desc")}
                </p>
                <img
                  src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772035619/dsecure-manual/08_Cloud_Erase/9.png"
                  alt={t("manual.cloud_erase_processing_1")}
                  className="w-full mb-4"
                  style={{ borderRadius: "3%" }}
                />
              </div>
              <div>
                <p className="text-slate-700 mb-2">
                  <strong>{t("manual.cloud_erase_summary")}</strong>{" "}
                  {t("manual.cloud_screenshot10_desc")}
                </p>
                <img
                  src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772034560/dsecure-manual/08_Cloud_Erase/10.png"
                  alt={t("manual.cloud_erase_summary_1")}
                  className="w-full mb-4"
                  style={{ borderRadius: "3%" }}
                />
              </div>
              <div>
                <p className="text-slate-700 mb-2">
                  <strong>{t("manual.cloud_erase_volume_overview")}</strong>{" "}
                  {t("manual.cloud_screenshot11_desc")}
                </p>
                <img
                  src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772034649/dsecure-manual/08_Cloud_Erase/11.png"
                  alt={t("manual.cloud_erase_volume_overview_1")}
                  className="w-full mb-4"
                  style={{ borderRadius: "3%" }}
                />
              </div>
              <div>
                <p className="text-slate-700 mb-2">
                  <strong>{t("manual.cloud_erase_volume_erasure")}</strong>{" "}
                  {t("manual.cloud_screenshot12_desc")}
                </p>
                <img
                  src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772034737/dsecure-manual/08_Cloud_Erase/12.png"
                  alt={t("manual.cloud_erase_volume_erasure_1")}
                  className="w-full mb-4"
                  style={{ borderRadius: "3%" }}
                />
              </div>
              <div>
                <p className="text-slate-700 mb-2">
                  <strong>{t("manual.cloud_erase_volume_progress")}</strong>{" "}
                  {t("manual.cloud_screenshot13_desc")}
                </p>
                <img
                  src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772034825/dsecure-manual/08_Cloud_Erase/13.png"
                  alt={t("manual.cloud_erase_volume_progress_1")}
                  className="w-full mb-4"
                  style={{ borderRadius: "3%" }}
                />
              </div>
              <div>
                <p className="text-slate-700 mb-2">
                  <strong>{t("manual.cloud_erase_completion")}</strong>{" "}
                  {t("manual.cloud_screenshot14_desc")}
                </p>
                <img
                  src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772034912/dsecure-manual/08_Cloud_Erase/14.png"
                  alt={t("manual.cloud_erase_completion_1")}
                  className="w-full mb-4"
                  style={{ borderRadius: "3%" }}
                />
              </div>
              <div>
                <p className="text-slate-700 mb-2">
                  <strong>{t("manual.cloud_erase_final_report")}</strong>{" "}
                  {t("manual.cloud_screenshot15_desc")}
                </p>
                <img
                  src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772035000/dsecure-manual/08_Cloud_Erase/15.png"
                  alt={t("manual.cloud_erase_final_report_1")}
                  className="w-full mb-4"
                  style={{ borderRadius: "3%" }}
                />
              </div>
            </div>
          </>
        ),
      },
      {
        id: "schedule",
        number: "4.4",
        title: t("manual.scheduler_title"),
        content: (
          <>
            <p className="text-slate-700 leading-relaxed mb-4">
              {t("manual.scheduler_intro")}
            </p>
            <div>
              <p className="text-slate-700 mb-3">
                <strong>1.</strong>{" "}
                <strong> {t("manual.open_scheduler_tab")} </strong>{" "}
                {t("manual.scheduler_step1_desc")}
              </p>
            </div>
            <div>
              <p className="text-slate-700 mb-3">
                <strong>2.</strong>{" "}
                <strong> {t("manual.configure_task_details")} </strong>{" "}
                {t("manual.define_the_parameters_for_your_automated_eras")}
                <br />
                <br />
                <h5>
                  {" "}
                  <strong>{t("manual.21_frequency_timing")} </strong>
                  {t("manual.scheduler_step2_1_desc")}
                </h5>
                <h5>
                  <strong>{t("manual.22_task_identification")}</strong>{" "}
                  {t("manual.scheduler_step2_2_desc")}
                </h5>
                <h5>
                  <strong>{t("manual.23_select_data")} </strong>
                  {t("manual.scheduler_step2_3_desc")}
                </h5>{" "}
              </p>
              <br />
            </div>
            <div>
              <p className="text-slate-700 mb-3">
                <strong>3.</strong>{" "}
                <strong> {t("manual.browse_and_select_items")} </strong>{" "}
                {t("manual.scheduler_step3_desc")}
              </p>
            </div>
            <div>
              <p className="text-slate-700 mb-3">
                <strong>4.</strong>{" "}
                <strong> {t("manual.finalize_and_save_task")} </strong>{" "}
                {t("manual.scheduler_step4_desc")}
              </p>
            </div>
            <div>
              <p className="text-slate-700 mb-3">
                <strong>5.</strong>{" "}
                <strong> {t("manual.confirm_and_save_schedule")} </strong>{" "}
                {t("manual.scheduler_step5_desc")}
              </p>
            </div>
            <div>
              <p className="text-slate-700 mb-3">
                <strong>6.</strong>{" "}
                <strong> {t("manual.finalize_and_confirm_task")} </strong>{" "}
                {t("manual.scheduler_step6_desc")}
              </p>
            </div>
            <div>
              <p className="text-slate-700 mb-3">
                <strong>7.</strong>{" "}
                <strong> {t("manual.manage_existing_tasks")} </strong>{" "}
                {t("manual.scheduler_step7_desc")}
              </p>
            </div>
            <div>
              <p className="text-slate-700 mb-3">
                <strong>8.</strong>{" "}
                <strong> {t("manual.edit_an_existing_task")} </strong>{" "}
                {t("manual.scheduler_step8_desc")}
              </p>
            </div>
            <div>
              <p className="text-slate-700 mb-3">
                <strong>9.</strong>{" "}
                <strong> {t("manual.update_task_and_confirm")} </strong>{" "}
                {t("manual.scheduler_step9_desc")}
              </p>
            </div>
            <div>
              <p className="text-slate-700 mb-3">
                <strong>10.</strong>{" "}
                <strong> {t("manual.update_task_and_confirm")} </strong>{" "}
                {t("manual.scheduler_step10_desc")}
              </p>
            </div>
            <div>
              <p className="text-slate-700 mb-3">
                <strong>11.</strong>{" "}
                <strong> {t("manual.monitor_scheduled_execution")} </strong>{" "}
                {t("manual.scheduler_step11_desc")}
              </p>
            </div>
            <div>
              <p className="text-slate-700 mb-3">
                <strong>12.</strong>{" "}
                <strong>
                  {" "}
                  {t("manual.final_completion_and_report_generation")}{" "}
                </strong>{" "}
                {t("manual.scheduler_step12_desc")}
              </p>
            </div>

            <h4 className="text-base font-semibold text-slate-800 mt-8 mb-4">
              {t("manual.scheduler_product_screenshots")}
            </h4>
            <div className="space-y-4">
              <div>
                <p className="text-slate-700 mb-2">
                  <strong>{t("manual.scheduler_main_interface")}</strong>{" "}
                  {t("manual.scheduler_screenshot1_desc")}
                </p>
                <img
                  src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772033769/dsecure-manual/06_Scheduler/S-1.png"
                  alt={t("manual.scheduler_main_interface_1")}
                  className="w-full mb-4"
                  style={{ borderRadius: "3%" }}
                />
              </div>
              <div>
                <p className="text-slate-700 mb-2">
                  <strong>{t("manual.scheduler_task_configuration")}</strong>{" "}
                  {t("manual.scheduler_screenshot2_desc")}
                </p>
                <img
                  src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772033856/dsecure-manual/06_Scheduler/S-2.png"
                  alt={t("manual.scheduler_task_configuration_1")}
                  className="w-full mb-4"
                  style={{ borderRadius: "3%" }}
                />
              </div>
              <div>
                <p className="text-slate-700 mb-2">
                  <strong>{t("manual.scheduler_browse_items")}</strong>{" "}
                  {t("manual.scheduler_screenshot3_desc")}
                </p>
                <img
                  src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772033944/dsecure-manual/06_Scheduler/S-3.png"
                  alt={t("manual.scheduler_browse_items_1")}
                  className="w-full mb-4"
                  style={{ borderRadius: "3%" }}
                />
              </div>
              <div>
                <p className="text-slate-700 mb-2">
                  <strong>{t("manual.scheduler_task_list")}</strong>{" "}
                  {t("manual.scheduler_screenshot4_desc")}
                </p>
                <img
                  src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772034032/dsecure-manual/06_Scheduler/S-4.png"
                  alt={t("manual.scheduler_task_list_1")}
                  className="w-full mb-4"
                  style={{ borderRadius: "3%" }}
                />
              </div>
              <div>
                <p className="text-slate-700 mb-2">
                  <strong>{t("manual.scheduler_execution")}</strong>{" "}
                  {t("manual.scheduler_screenshot5_desc")}
                </p>
                <img
                  src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772034120/dsecure-manual/06_Scheduler/S-5.png"
                  alt={t("manual.scheduler_execution_1")}
                  className="w-full mb-4"
                  style={{ borderRadius: "3%" }}
                />
              </div>
            </div>
          </>
        ),
      },
      {
        id: "reports",
        number: "4.5",
        title: t("manual.reports_title"),
        children: [
          {
            id: "preview-report",
            number: "4.5.1",
            title: t("manual.preview_report_title"),
            content: (
              <>
                <p className="text-slate-700 leading-relaxed mb-6">
                  {t("manual.preview_report_intro")}
                </p>
                <div className="space-y-6">
                  <div>
                    <p className="text-slate-700 leading-relaxed">
                      <strong>{t("manual.1_access_reports_section")}</strong>{" "}
                      {t("manual.preview_step1_desc")}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-700 leading-relaxed">
                      <strong>{t("manual.2_select_report_to_preview")}</strong>{" "}
                      {t("manual.preview_step2_desc")}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-700 leading-relaxed">
                      <strong>{t("manual.3_click_preview_button")}</strong>{" "}
                      {t("manual.preview_step3_desc")}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-700 leading-relaxed">
                      <strong>{t("manual.4_review_report_details")}</strong>{" "}
                      {t("manual.preview_step4_desc")}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-700 leading-relaxed">
                      <strong>{t("manual.5_navigate_report_sections")}</strong>{" "}
                      {t("manual.preview_step5_desc")}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-700 leading-relaxed">
                      <strong>{t("manual.6_close_or_proceed")}</strong>{" "}
                      {t("manual.preview_step6_desc")}
                    </p>
                  </div>
                </div>

                <h4 className="text-base font-semibold text-slate-800 mt-8 mb-4">
                  {t("manual.reports_product_screenshots")}
                </h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-slate-700 mb-2">
                      <strong>{t("manual.reports_overview")}</strong>{" "}
                      {t("manual.reports_screenshot1_desc")}
                    </p>
                    <img
                      src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772034208/dsecure-manual/07_Reports/R-1.png"
                      alt={t("manual.reports_overview_1")}
                      className="w-full mb-4"
                      style={{ borderRadius: "3%" }}
                    />
                  </div>
                  <div>
                    <p className="text-slate-700 mb-2">
                      <strong>{t("manual.reports_report_details")}</strong>{" "}
                      {t("manual.reports_screenshot2_desc")}
                    </p>
                    <img
                      src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772034296/dsecure-manual/07_Reports/R-2.png"
                      alt={t("manual.reports_report_details_1")}
                      className="w-full mb-4"
                      style={{ borderRadius: "3%" }}
                    />
                  </div>
                </div>
              </>
            ),
          },
          {
            id: "save-report",
            number: "4.5.2",
            title: t("manual.save_report_title"),
            content: (
              <>
                <p className="text-slate-700 leading-relaxed mb-6">
                  {t("manual.save_report_intro")}
                </p>
                <div className="space-y-6">
                  <div>
                    <p className="text-slate-700 leading-relaxed">
                      <strong>
                        {t("manual.1_select_report_from_reports_tab")}
                      </strong>{" "}
                      {t("manual.save_step1_desc")}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-700 leading-relaxed">
                      <strong>{t("manual.2_click_save_report_button")}</strong>{" "}
                      {t("manual.save_step2_desc")}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-700 leading-relaxed">
                      <strong>{t("manual.3_choose_report_format")}</strong>{" "}
                      {t("manual.save_step3_desc")}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-700 leading-relaxed">
                      <strong>{t("manual.4_select_destination_folder")}</strong>{" "}
                      {t("manual.save_step4_desc")}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-700 leading-relaxed">
                      <strong>{t("manual.5_configure_file_name")}</strong>{" "}
                      {t("manual.save_step5_desc")}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-700 leading-relaxed">
                      <strong>{t("manual.6_complete_save_process")}</strong>{" "}
                      {t("manual.save_step6_desc")}
                    </p>
                  </div>
                </div>
              </>
            ),
          },
          {
            id: "cloud-report",
            number: "4.5.3",
            title: t("manual.cloud_report_title"),
            content: (
              <>
                <p className="text-slate-700 leading-relaxed mb-6">
                  {t("manual.cloud_report_intro")}
                </p>
                <div className="space-y-6">
                  <div>
                    <p className="text-slate-700 leading-relaxed">
                      <strong>
                        {t("manual.1_verify_cloud_account_login")}
                      </strong>{" "}
                      {t("manual.cloud_report_step1_desc")}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-700 leading-relaxed">
                      <strong>
                        {t("manual.2_navigate_to_reports_section")}
                      </strong>{" "}
                      {t("manual.cloud_report_step2_desc")}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-700 leading-relaxed">
                      <strong>{t("manual.3_select_reports_for_upload")}</strong>{" "}
                      {t("manual.cloud_report_step3_desc")}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-700 leading-relaxed">
                      <strong>{t("manual.4_initiate_cloud_upload")}</strong>{" "}
                      {t("manual.cloud_report_step4_desc")}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-700 leading-relaxed">
                      <strong>{t("manual.5_confirm_upload_operation")}</strong>{" "}
                      {t("manual.cloud_report_step5_desc")}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-700 leading-relaxed">
                      <strong>{t("manual.6_monitor_upload_progress")}</strong>{" "}
                      {t("manual.cloud_report_step6_desc")}
                    </p>
                  </div>
                </div>
              </>
            ),
          },
          {
            id: "report-settings",
            number: "4.5.4",
            title: t("manual.report_settings_title"),
            content: (
              <>
                <p className="text-slate-700 leading-relaxed mb-6">
                  {t("manual.report_settings_intro")}
                </p>
                <div className="space-y-6">
                  <div>
                    <p className="text-slate-700 leading-relaxed">
                      <strong>{t("manual.1_access_settings_menu")}</strong>{" "}
                      {t("manual.report_settings_step1_desc")}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-700 leading-relaxed">
                      <strong>
                        {t("manual.2_navigate_to_report_settings")}
                      </strong>{" "}
                      {t("manual.report_settings_step2_desc")}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-700 leading-relaxed">
                      <strong>
                        {t("manual.3_configure_company_information")}
                      </strong>{" "}
                      {t("manual.report_settings_step3_desc")}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-700 leading-relaxed">
                      <strong>{t("manual.4_upload_company_logo")}</strong>{" "}
                      {t("manual.report_settings_step4_desc")}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-700 leading-relaxed">
                      <strong>
                        {t("manual.5_set_technician_information")}
                      </strong>{" "}
                      {t("manual.report_settings_step5_desc")}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-700 leading-relaxed">
                      <strong>{t("manual.6_customize_report_fields")}</strong>{" "}
                      {t("manual.report_settings_step6_desc")}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-700 leading-relaxed">
                      <strong>{t("manual.7_save_configuration")}</strong>{" "}
                      {t("manual.report_settings_step7_desc")}
                    </p>
                  </div>
                </div>
              </>
            ),
          },
        ],
      },
      {
        id: "settings",
        number: "4.6",
        title: t("manual.configuring_settings_title"),
        children: [
          {
            id: "general-settings",
            number: "4.6.1",
            title: t("manual.general_settings_title"),
            children: [
              {
                id: "themes",
                number: "4.6.1.1",
                title: t("manual.change_themes_title"),
                content: (
                  <>
                    <p className="text-slate-700 leading-relaxed mb-6">
                      {t("manual.change_themes_intro")}
                    </p>
                    <div className="space-y-6">
                      <div>
                        <p className="text-slate-700 leading-relaxed">
                          <strong>{t("manual.1_open_settings_panel")}</strong>{" "}
                          {t("manual.themes_step1_desc")}
                        </p>
                      </div>

                      <div>
                        <p className="text-slate-700 leading-relaxed">
                          <strong>
                            {t("manual.2_navigate_to_general_settings")}
                          </strong>{" "}
                          {t("manual.themes_step2_desc")}
                        </p>
                      </div>

                      <div>
                        <p className="text-slate-700 leading-relaxed">
                          <strong>{t("manual.3_locate_theme_options")}</strong>{" "}
                          {t("manual.themes_step3_full_desc")}
                        </p>
                      </div>

                      <div>
                        <p className="text-slate-700 leading-relaxed">
                          <strong>{t("manual.4_select_light_mode")}</strong>{" "}
                          {t("manual.themes_light_mode_full_desc")}
                        </p>
                      </div>

                      <div>
                        <p className="text-slate-700 leading-relaxed">
                          <strong>{t("manual.5_select_dark_mode")}</strong>{" "}
                          {t("manual.themes_dark_mode_full_desc")}
                        </p>
                      </div>

                      <div>
                        <p className="text-slate-700 leading-relaxed">
                          <strong>{t("manual.6_select_system_default")}</strong>{" "}
                          {t("manual.themes_system_default_full_desc")}
                        </p>
                      </div>

                      <div>
                        <p className="text-slate-700 leading-relaxed">
                          <strong>{t("manual.7_apply_theme_changes")}</strong>{" "}
                          {t("manual.themes_apply_full_desc")}
                        </p>
                      </div>
                    </div>

                    <h4 className="text-base font-semibold text-slate-800 mt-8 mb-4">
                      {t("manual.settings_product_screenshots")}
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-slate-700 mb-2">
                          <strong>{t("manual.settings_general")}</strong>{" "}
                          {t("manual.settings_general_desc")}
                        </p>
                        <img
                          src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772035708/dsecure-manual/09_Settings/1_Settings.png"
                          alt={t("manual.settings_general_1")}
                          className="w-full mb-4"
                          style={{ borderRadius: "3%" }}
                        />
                      </div>
                      <div>
                        <p className="text-slate-700 mb-2">
                          <strong>{t("manual.settings_ignore_list")}</strong>{" "}
                          {t("manual.settings_ignore_full_desc")}
                        </p>
                        <img
                          src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772035796/dsecure-manual/09_Settings/2_Setting_ignore_list.png"
                          alt={t("manual.settings_ignore_list_1")}
                          className="w-full mb-4"
                          style={{ borderRadius: "3%" }}
                        />
                      </div>
                      <div>
                        <p className="text-slate-700 mb-2">
                          <strong>{t("manual.settings_appearance")}</strong>{" "}
                          {t("manual.settings_appearance_desc")}
                        </p>
                        <img
                          src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772035887/dsecure-manual/09_Settings/3_setting_appearance.png"
                          alt={t("manual.settings_appearance_1")}
                          className="w-full mb-4"
                          style={{ borderRadius: "3%" }}
                        />
                      </div>
                      <div>
                        <p className="text-slate-700 mb-2">
                          <strong>{t("manual.settings_language")}</strong>{" "}
                          {t("manual.settings_language_desc")}
                        </p>
                        <img
                          src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772035987/dsecure-manual/09_Settings/4_settings_launguage.png"
                          alt={t("manual.settings_language_1")}
                          className="w-full mb-4"
                          style={{ borderRadius: "3%" }}
                        />
                      </div>
                    </div>
                  </>
                ),
              },
              {
                id: "erasure-options",
                number: "4.6.1.2",
                title: t("manual.erasure_options_title"),
                content: (
                  <>
                    <p className="text-slate-700 leading-relaxed mb-6">
                      {t("manual.erasure_options_intro")}
                    </p>
                    <div className="space-y-6">
                      <div>
                        <p className="text-slate-700 leading-relaxed">
                          <strong>{t("manual.1_access_settings_menu")}</strong>{" "}
                          {t("manual.erasure_step1_desc")}
                        </p>
                      </div>

                      <div>
                        <p className="text-slate-700 leading-relaxed">
                          <strong>
                            {t("manual.2_navigate_to_erasure_settings")}
                          </strong>{" "}
                          {t("manual.erasure_step2_desc")}
                        </p>
                      </div>

                      <div>
                        <p className="text-slate-700 leading-relaxed">
                          <strong>
                            {t("manual.3_select_default_erasure_algorithm")}
                          </strong>{" "}
                          {t("manual.erasure_step3_desc")}
                        </p>
                      </div>

                      <div>
                        <p className="text-slate-700 leading-relaxed">
                          <strong>
                            {t("manual.4_configure_verification_method")}
                          </strong>{" "}
                          {t("manual.erasure_step4_desc")}
                        </p>
                      </div>

                      <div>
                        <p className="text-slate-700 leading-relaxed">
                          <strong>
                            {t("manual.5_set_additional_preferences")}
                          </strong>{" "}
                          {t("manual.erasure_step5_desc")}
                        </p>
                      </div>

                      <div>
                        <p className="text-slate-700 leading-relaxed">
                          <strong>
                            {t("manual.6_configure_performance_options")}
                          </strong>{" "}
                          {t("manual.erasure_step6_desc")}
                        </p>
                      </div>

                      <div>
                        <p className="text-slate-700 leading-relaxed">
                          <strong>{t("manual.7_save_configuration")}</strong>{" "}
                          {t("manual.erasure_step7_desc")}
                        </p>
                      </div>
                    </div>
                  </>
                ),
              },
            ],
          },
          /* Hidden: Settings to Erase Traces section
          {
            id: "trace-settings",
            number: "4.6.2",
            title: "Settings to Erase Traces",
            content: (
              <>
                <p className="text-slate-700 leading-relaxed mb-4">
                  {t("manual.trace_settings_desc")}
                </p>
                <div className="space-y-4">
                </div>
              </>
            )
          }
          */
        ],
      },
      {
        id: "cloud-login",
        number: "4.7",
        title: t("manual.cloud_login_title"),
        content: (
          <>
            <p className="text-slate-700 leading-relaxed mb-6">
              {t("manual.cloud_login_intro")}
            </p>
            <div className="space-y-6">
              <div>
                <p className="text-slate-700 leading-relaxed mb-3">
                  {" "}
                  {t("manual.cloud_login_step1")}
                </p>
              </div>

              <div>
                <p className="text-slate-700 leading-relaxed mb-3">
                  {t("manual.cloud_login_step2")}
                </p>
              </div>

              <div>
                <p className="text-slate-700 leading-relaxed mb-3">
                  {t("manual.cloud_login_step3")}
                </p>
              </div>

              <div>
                <p className="text-slate-700 leading-relaxed mb-3">
                  {t("manual.cloud_login_step4")}
                </p>
              </div>

              <div>
                <p className="text-slate-700 leading-relaxed mb-3">
                  {t("manual.cloud_login_step5")}
                </p>
              </div>
            </div>
          </>
        ),
      },
    ],
  },
  {
    id: "faqs",
    number: "5",
    title: t("manual.faq_title"),
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">
            {t("manual.faq_q1")}
          </h3>
          <p className="text-slate-700">
            {t("manual.faq_a1")}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">
            {t("manual.faq_q2")}
          </h3>
          <p className="text-slate-700">
            {t("manual.faq_a2")}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">
            {t("manual.faq_q3")}
          </h3>
          <p className="text-slate-700">
            {t("manual.faq_a3")}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">
            {t("manual.faq_q4")}
          </h3>
          <p className="text-slate-700">
            {t("manual.faq_a4")}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">
            {t("manual.faq_q5")}
          </h3>
          <p className="text-slate-700">
            {t("manual.faq_a5")}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">
            {t("manual.faq_q6")}
          </h3>
          <p className="text-slate-700">
            {t("manual.faq_a6")}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">
            {t("manual.faq_q7")}
          </h3>
          <p className="text-slate-700">
            {t("manual.faq_a7")}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">
            {t("manual.faq_q8")}
          </h3>
          <p className="text-slate-700">
            {t("manual.faq_a8")}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">
            {t("manual.faq_q9")}
          </h3>
          <p className="text-slate-700">
            {t("manual.faq_a9")}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">
            {t("manual.faq_q10")}
          </h3>
          <p className="text-slate-700">
            {t("manual.faq_a10")}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">
            {t("manual.faq_q11")}
          </h3>
          <p className="text-slate-700">
            {t("manual.faq_a11")}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">
            {t("manual.faq_q12")}
          </h3>
          <p className="text-slate-700">
            {t("manual.faq_a12")}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">
            {t("manual.faq_q13")}
          </h3>
          <p className="text-slate-700">
            {t("manual.faq_a13")}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">
            {t("manual.faq_q14")}
          </h3>
          <p className="text-slate-700">
            {t("manual.faq_a14")}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">
            {t("manual.faq_q15")}
          </h3>
          <p className="text-slate-700">
            {t("manual.faq_a15")}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">
            {t("manual.faq_q16")}
          </h3>
          <p className="text-slate-700">
            {t("manual.faq_a16")}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">
            {t("manual.faq_q17")}
          </h3>
          <p className="text-slate-700">
            {t("manual.faq_a17")}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">
            {t("manual.faq_q18")}
          </h3>
          <p className="text-slate-700 mb-2">
            {t("manual.faq_a18_p1")}
          </p>
          <p className="text-slate-700 mb-2">
            {t("manual.faq_a18_p2")}
          </p>
          <ol className="list-decimal list-inside space-y-1 text-slate-700 ml-4 mb-2">
            <li>
              {t("manual.faq_a18_step1")}
            </li>
            <li>
              {t("manual.faq_a18_step2")}
            </li>
            <li>
              {t("manual.faq_a18_step3")}
            </li>
            <li>
              {t("manual.faq_a18_step4")}
            </li>
            <li>
              {t("manual.faq_a18_step5")}
            </li>
            <li>
              {t("manual.faq_a18_step6")}
            </li>
            <li>
              {t("manual.faq_a18_step7")}
            </li>
            <li>
              {t("manual.faq_a18_step8")}
            </li>
          </ol>
          <p className="text-slate-700 mt-2">
            {t("manual.faq_a18_conclusion")}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">
            {t("manual.faq_q19")}
          </h3>
          <p className="text-slate-700">
            {t("manual.faq_a19")}
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "about-dsecure",
    number: "6",
    title: t("manual.about_dsecure_title"),
    content: (
      <p className="text-slate-700 leading-relaxed">
        {t("manual.about_dsecure_full_desc")}
      </p>
    ),
  },
];

/* ===========================
   UI Components & Helpers
   =========================== */

const Anchor: React.FC<{ id: string }> = ({ id }) => (
  <div id={id} className="relative -top-24" />
);

const useScrollToHash = () => {
  useEffect(() => {
    const { hash } = window.location;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);
};

// Recursive renderer for sidebar
const SidebarItem: React.FC<{
  item: NavItem;
  activeSection: string;
  onJump: (id: string) => void;
  level?: number;
}> = ({ item, activeSection, onJump, level = 0 }) => {
  const hasChildren = item.children && item.children.length > 0;
  const isActive = activeSection === item.id;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="text-sm">
      <div
        className={`flex items-center gap-2 py-1.5 px-3 rounded-md transition-colors cursor-pointer ${
          isActive
            ? "bg-blue-100 text-blue-700 font-semibold"
            : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
        }`}
        style={{ paddingLeft: `${level * 12 + 12}px` }}
        onClick={(e) => {
          e.stopPropagation();
          onJump(`#${item.id}`);
          if (hasChildren) setIsExpanded(!isExpanded);
        }}
      >
        {hasChildren && (
          <span
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="p-0.5 hover:bg-gray-200 rounded"
          >
            {isExpanded ? (
              <ChevronRight className="w-3.5 h-3.5 rotate-90 transition-transform" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5 transition-transform" />
            )}
          </span>
        )}
        {!hasChildren && <span className="w-3.5" />}

        <a
          href={`#${item.id}`}
          onClick={(e) => e.preventDefault()}
          className="flex-1 break-words"
        >
          {item.title}
        </a>
      </div>
      {hasChildren && isExpanded && (
        <div className="mt-1 border-l border-gray-200 ml-6">
          {item.children!.map((child) => (
            <SidebarItem
              key={child.id}
              item={child}
              activeSection={activeSection}
              onJump={onJump}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Recursive renderer for content
const ContentSection: React.FC<{ item: NavItem; level?: number }> = ({
  item,
  level = 0,
}) => {
  return (
    <section className="scroll-mt-24 mb-12">
      <Anchor id={item.id} />

      <div
        className={`mb-6 ${level === 0 ? "pb-4 border-b-2 border-gray-200" : ""}`}
      >
        <div className="flex items-center gap-3">
          <h2
            className={`${
              level === 0
                ? "text-3xl font-bold text-gray-900"
                : level === 1
                  ? "text-2xl font-semibold text-gray-800 mt-8"
                  : "text-xl font-medium text-gray-800 mt-6"
            }`}
          >
            {item.title}
          </h2>
        </div>
      </div>

      {item.content && (
        <div className="text-gray-700 text-base leading-relaxed space-y-4 prose prose-blue max-w-none">
          {item.content}
        </div>
      )}

      {item.children && (
        <div className="space-y-8 mt-6">
          {item.children.map((child) => (
            <ContentSection key={child.id} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </section>
  );
};

/* ===========================
   Main Component
   =========================== */
const CompleteDSecureManual: React.FC = () => {
  const { t } = useTranslation();
  const navigationTree = useMemo(() => getNavigationTree(t), [t]);
  useScrollToHash();
  const [activeSection, setActiveSection] = useState("");
  const [shouldShowScrollTop, setShouldShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShouldShowScrollTop(window.scrollY > 400);
      const headingElements = document.querySelectorAll("[id]");
      let currentSection = "";
      headingElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= 300) {
          currentSection = el.id;
        }
      });
      if (currentSection) setActiveSection(currentSection);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onJump = (hash: string) => {
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(hash.replace("#", ""));
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead seo={getSEOForPage("complete-dsecure-manual")} />

      <style>{`
        .sidebar-scroll::-webkit-scrollbar { width: 6px; }
        .sidebar-scroll::-webkit-scrollbar-track { background: #f3f4f6; border-radius: 3px; }
        .sidebar-scroll::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 3px; }
        .sidebar-scroll::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
        html { scroll-behavior: smooth; }
      `}</style>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <aside className="hidden lg:block lg:w-72 shrink-0">
            <div className="sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto sidebar-scroll pr-2">
              <div className="mb-6">
                <h3 className="text-sm uppercase tracking-wider text-gray-500 font-bold mb-4">
                  {t("manual.tableOfContents", {
                    defaultValue: "Table of Contents",
                  })}
                </h3>
                <nav className="space-y-1">
                  {navigationTree.map((item) => (
                    <SidebarItem
                      key={item.id}
                      item={item}
                      activeSection={activeSection}
                      onJump={onJump}
                    />
                  ))}
                </nav>
              </div>
            </div>
          </aside>

          <main className="flex-1 min-w-0 bg-white rounded-xl shadow-sm border border-gray-200 p-8 lg:p-12">
            <div className="mb-12 pb-8 border-b border-gray-200">
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-4">
                {t("manual.dsecure_file_eraser")}
              </h1>
              <p className="text-xl text-gray-500">
                {t("manual.pageTitle", {
                  defaultValue: "Complete User Guide & Documentation",
                })}
              </p>
            </div>

            <div className="space-y-16">
              {navigationTree.map((item) => (
                <ContentSection key={item.id} item={item} />
              ))}
            </div>

            <footer className="mt-20 pt-8 border-t border-gray-200 text-center">
              <p className="text-gray-500 mb-2">
                {t("manual.needAssistance", {
                  defaultValue: "Need further assistance?",
                })}
              </p>
              <a
                href="mailto:support@dsecuretech.com"
                className="text-blue-600 font-medium hover:underline"
              >
                {t("manual.contactSupport", {
                  defaultValue: "Contact Support",
                })}
              </a>
              <p className="text-sm text-gray-400 mt-8">
                © {new Date().getFullYear()} D-SecureTech.{" "}
                {t("manual.allRightsReserved", {
                  defaultValue: "All rights reserved.",
                })}
              </p>
            </footer>
          </main>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 rounded-full bg-blue-600 text-white shadow-lg transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 z-50 ${
          shouldShowScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </div>
  );
};

export default CompleteDSecureManual;
