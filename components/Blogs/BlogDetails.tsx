import { Image } from "@graphcommerce/image";
import { Box } from "@mui/material";
import { splitHtmlAfterPCount } from "../../lib/splitHtmlAfterPCount";
import { saxoGrammaticus } from "../../lib/fonts";

export function BlogDetails(props: any) {
    const blogs = props?.blogs;

    const { first, second } = splitHtmlAfterPCount(
        blogs?.post_content,
        5
    );

    return (
        <Box sx={{
            marginTop: { xs: "24px", md: "34px" },
            marginBottom: { xs: "20px", md: "34px" },
        }}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: { xs: "24px", md: "56px" },
                alignItems: "start",
                justifyItems: "start",
                width: "100%"
            }}>
                <Box sx={{ width: "100%" }}>
                    <Image
                        src={blogs?.image || "https://srv900162.hstgr.cloud/media/mageplaza/blog/post/p/l/placeholder.jpg"}
                        alt={blogs?.name || ""}
                        width={200}
                        height={380}
                        sx={{ height: 'auto', maxHeight: { xs: "unset", md: "400px", lg: "533px" }, minHeight: { xs: "unset", md: "400px", lg: "533px" }, width: '100%', objectFit: 'cover', borderRadius: "8px" }}
                    />
                </Box>

                <Box sx={(theme: any) => ({
                    ['&.MuiBox-root, &.MuiBox-root div']: {
                        ['strong']: {
                            fontWeight: 700
                        },
                        ['& p']: {
                            margin: { xs: "0 0 20px !important", sm: "0 0 33px !important" },
                            fontSize: "16px",
                            lineHeight: "170%",
                            color: "#6F6F6F",
                            fontWeight: 400
                        },
                        ['h1, h2, h3, h4, h5, h6']: {
                            fontFamily: `${saxoGrammaticus.style.fontFamily}, sans-serif`,
                            color: (theme: any) => theme.palette.custom.heading,
                            fontWeight: 500,
                            margin: 0,
                            ['strong']: {
                                fontWeight: 500,
                            }
                        },
                        ['& p:has(+ ul), & p:has(+ ol)']: {
                            margin: { xs: "0 0 10px !important", sm: "0 0 10px !important" },
                        },
                        ['& p + ul, & p + ol']: {
                            marginTop: { xs: "10px !important", sm: "10px !important" },
                            marginBottom: { xs: "20px !important", sm: "33px !important" },
                        },
                        ['& ul, & ol']: {
                            ['& li']: {
                                margin: "0 0 8px !important",
                                ['& p']: {
                                    margin: { xs: "0 0 !important", sm: "0 0 !important" },
                                }
                            }
                        }
                    }
                })}>
                    {blogs?.gallery_images?.length > 0 && <Image
                        src={`https://srv900162.hstgr.cloud/media/${blogs?.gallery_images[0]}`}
                        alt={blogs?.name || ""}
                        width={200}
                        height={380}
                        sx={{ height: 'auto', maxHeight: { md: "250px", lg: "336px" }, minHeight: { md: "250px", lg: "336px" }, width: '100%', maxWidth: { sm: "50%", md: "440px" }, objectFit: 'cover', borderRadius: "8px", float: { xs: "left", md: "left" }, margin: "0px 26px 20px 0px" }}
                    />}

                    {blogs?.post_content && (
                        <div dangerouslySetInnerHTML={{ __html: first }} />
                    )}

                    {blogs?.gallery_images?.length > 1 && <Image
                        src={`https://srv900162.hstgr.cloud/media/${blogs?.gallery_images[1]}`}
                        alt={blogs?.name || ""}
                        width={200}
                        height={380}
                        sx={{ height: 'auto', maxHeight: { md: "400px", lg: "533px" }, minHeight: { md: "400px", lg: "533px" }, width: '100%', maxWidth: { sm: "50%", md: "440px" }, objectFit: 'cover', borderRadius: "8px", float: "right", margin: "20px 0px 20px 41px" }}
                    />}

                    {blogs?.post_content && (
                        <div dangerouslySetInnerHTML={{ __html: second }} />
                    )}
                </Box>
            </Box>
        </Box>
    )
}