import React from "react";
import { useLink } from "@refinedev/core";
import { Link as RouterLink } from "react-router";
import MuiLink from "@mui/material/Link";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
import type { RefineLayoutThemedTitleProps } from "@refinedev/mui";

export const ThemedTitle: React.FC<RefineLayoutThemedTitleProps> = ({
    collapsed,
    wrapperStyles,
    icon: iconFromProps,
    text: textFromProps,
}) => {
    const Link = useLink();

    const icon = iconFromProps ?? (
        <SvgIcon>
            <path d="M12 2L2 22h20L12 2zm0 3.5L18.5 20H5.5L12 5.5z" />
        </SvgIcon>
    );

    const text = textFromProps ?? "Refine Project";

    return (
        <MuiLink
            to="/"
            component={RouterLink}
            underline="none"
            sx={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                ...wrapperStyles,
            }}
        >
            {icon}
            {!collapsed && (
                <Typography
                    variant="h6"
                    fontWeight={700}
                    color="text.primary"
                    fontSize="inherit"
                    textOverflow="ellipsis"
                    overflow="hidden"
                >
                    {text}
                </Typography>
            )}
        </MuiLink>
    );
};
