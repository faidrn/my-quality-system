import { useState, useEffect, useCallback } from "react";
import useLanguage from "./useLanguage";

const useTranslations = () => {
    const { language } = useLanguage();
    const [translations, setTranslations] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        import(`../locales/${language}.json`)
            .then((data) => setTranslations(data.default))
            .catch((err) => {
                console.error("Failed to load translations:", err);
                setError(err);
                setTranslations({});
            })
            .finally(() => setLoading(false));
    }, [language]);

    // Soporta claves anidadas: t("header.inputSearch")
    const t = useCallback((key) => {
        return key.split('.').reduce((obj, k) => obj?.[k], translations) ?? key;
    }, [translations]);

    return { t, translations, loading, error };
};

export default useTranslations;