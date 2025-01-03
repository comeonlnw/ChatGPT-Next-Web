import LeftIcon from "@/app/icons/left.svg";
import clsx from "clsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getClientConfig } from "../config/client";
import { Path, SAAS_CHAT_URL } from "../constant";
import BotIcon from "../icons/bot.svg";
import Locale from "../locales";
import { useAccessStore } from "../store";
import { trackAuthorizationPageButtonToCPaymentClick } from "../utils/auth-settings-events";
import styles from "./auth.module.scss";
import { IconButton } from "./button";
import { PasswordInput } from "./ui-lib";

export function AuthPage() {
  const navigate = useNavigate();
  const accessStore = useAccessStore();
  const goChat = () => navigate(Path.Chat);
  const goSaas = () => {
    trackAuthorizationPageButtonToCPaymentClick();
    window.location.href = SAAS_CHAT_URL;
  };

  useEffect(() => {
    if (getClientConfig()?.isApp) {
      navigate(Path.Settings);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles["auth-page"]}>
      <div className={styles["auth-header"]}>
        <IconButton
          icon={<LeftIcon />}
          text={Locale.Auth.Return}
          onClick={() => navigate(Path.Home)}
        ></IconButton>
      </div>
      <div className={clsx("no-dark", styles["auth-logo"])}>
        <BotIcon />
      </div>

      <div className={styles["auth-title"]}>{Locale.Auth.Title}</div>
      <div className={styles["auth-tips"]}>{Locale.Auth.Tips}</div>

      <PasswordInput
        style={{ marginTop: "3vh", marginBottom: "3vh" }}
        aria={Locale.Settings.ShowPassword}
        aria-label={Locale.Auth.Input}
        value={accessStore.accessCode}
        type="text"
        placeholder={Locale.Auth.Input}
        onChange={(e) => {
          accessStore.update(
            (access) => (access.accessCode = e.currentTarget.value),
          );
        }}
      />

      {!accessStore.hideUserApiKey ? (
        <>
          <div className={styles["auth-tips"]}>{Locale.Auth.SubTips}</div>
          <PasswordInput
            style={{ marginTop: "3vh", marginBottom: "3vh" }}
            aria={Locale.Settings.ShowPassword}
            aria-label={Locale.Settings.Access.OpenAI.ApiKey.Placeholder}
            value={accessStore.openaiApiKey}
            type="text"
            placeholder={Locale.Settings.Access.OpenAI.ApiKey.Placeholder}
            onChange={(e) => {
              accessStore.update(
                (access) => (access.openaiApiKey = e.currentTarget.value),
              );
            }}
          />
        </>
      ) : null}

      <div
        style={{
          width: 167,
          marginLeft: 40,
        }}
        className={styles["auth-actions"]}
      >
        <IconButton
          text={Locale.Auth.Confirm}
          type="primary"
          onClick={goChat}
        />
      </div>
    </div>
  );
}
