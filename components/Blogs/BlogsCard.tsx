import { Card, CardContent, CardMedia, Link, Typography } from "@mui/material";
import { Image } from "@graphcommerce/image";
import { saxoGrammaticus } from "../../lib/fonts";

export function BlogsCard(props: any) {
    const blog = props?.blog;

    return (
        <Card
            sx={(theme) => ({
                boxShadow: "none",
                display: "flex",
                flexDirection: "column",
                gap: { xs: "12px", md: "24px" },
                alignItems: "start",
                justifyItems: "start"
            })}
        >
            <CardMedia sx={{ position: 'relative', borderRadius: "8px", width: "100%" }}>
                <Image
                    src={blog?.image || "https://srv900162.hstgr.cloud/media/mageplaza/blog/post/p/l/placeholder.jpg"}
                    alt={blog?.name || ""}
                    width={200}
                    height={380}
                    sx={{ height: 'auto', maxHeight: { xs: "250px", md: "300px", lg: "380px" }, minHeight: { xs: "250px", md: "300px", lg: "380px" }, width: '100%', objectFit: 'cover', borderRadius: "8px" }}
                />
            </CardMedia>
            <CardContent
                sx={(theme) => ({
                    display: "flex",
                    flexDirection: "column",
                    gap: { xs: "8px", md: "15px" },
                    alignItems: "start",
                    justifyItems: "start",
                    padding: 0,
                    border: "none",
                    paddingBottom: "0 !important"
                })}>
                <Typography
                    gutterBottom
                    variant='body2'
                    component='div'
                    sx={{
                        color: (theme: any) => theme.palette.custom.heading,
                        fontSize: { xs: '20px', md: '25px' },
                        fontFamily: `${saxoGrammaticus.style.fontFamily}, sans-serif`,
                        textTransform: 'uppercase',
                        fontWeight: '300 !important',
                        marginBottom: { xs: 0 },
                    }}
                >
                    {blog?.name}
                </Typography>
                {blog?.short_description && (
                    <Typography
                        sx={{
                            color: (theme: any) => theme.palette.custom.secondary,
                            fontSize: { xs: '15px', md: '16px' },
                            lineHeight: '170%',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                        }}
                    >
                        {blog?.short_description}
                    </Typography>
                )}

                <Link sx={{
                    fontSize: "16px",
                    fontWeight: 500,
                    color: "#9B7C38",
                    textDecoration: "none"
                }} href={`/blogs/${blog?.url_key}`}>
                    Read More
                </Link>
            </CardContent>
        </Card>
    )
}