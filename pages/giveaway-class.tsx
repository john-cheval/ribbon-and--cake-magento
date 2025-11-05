import { PageOptions } from "@graphcommerce/framer-next-pages";
import { LayoutDocument, LayoutNavigation, LayoutOverlayProps } from "../components";
import { PageMeta, StoreConfigDocument } from "@graphcommerce/magento-store";
import { GetStaticProps } from "@graphcommerce/next-ui";
import { graphqlSharedClient, graphqlSsrClient } from "../lib/graphql/graphqlSsrClient";
import { cacheFirst } from "@graphcommerce/graphql";
import { AlekseonFormDocument, AlekseonFormQuery } from "../graphql/aleskonForm.gql";
import { Box, Typography } from "@mui/material";
import ClassForm from "../components/GiveAwayClass/ClassForm";

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<LayoutOverlayProps, Props>
type GiveAwayClassPageProps = {
    giveawayClassForm: AlekseonFormQuery
}

function GiveAwayClassPage({ giveawayClassForm }: GiveAwayClassPageProps) {
    return (
        <>
            <PageMeta
                title='Giveaway Class Form | Ribbon and Balloons'
                metaDescription='Custom cakes, handcrafted desserts — made for your moment.'
                canonical='/giveaway-class'
            />

            <Box sx={{ paddingInline: { xs: '18px', md: '25px', lg: '55px' }, paddingTop: "56px", paddingBottom: "69px" }}>
                <Box sx={{
                    maxWidth: "950px",
                    margin: "auto"
                }}>
                    <Typography
                        variant='h2'
                        component='h1'
                        gutterBottom
                        sx={{
                            margin: 0,
                            textAlign: "center"
                        }}
                    >Giveaway! Free Baking Class</Typography>
                    <Typography variant="body2" sx={{
                        textAlign: "center",
                        color: "#6F6F6F",
                        fontSize: "16px !important",
                        lineHeight: "32px !important"
                    }}>
                        Love baking or always dreamed of learning how to make beautiful, delicious treats? Here’s your chance! 🎉 <br />
                        Enter our Free Baking Class Giveaway and join us for a fun, hands-on experience where you’ll learn to bake like a pro. Whether you’re a beginner or a budding baker, this class is the perfect way to whisk, mix, and decorate your way to sweet success.
                    </Typography>

                    {
                        giveawayClassForm?.AlekseonForm?.Forms?.map((value, index) => (
                            <ClassForm formValue={value} />
                        ))
                    }
                </Box>
            </Box>
        </>
    )
}

GiveAwayClassPage.pageOptions = {
    Layout: LayoutNavigation,
} as PageOptions

export default GiveAwayClassPage

export const getStaticProps: GetPageStaticProps = async (context) => {
    const client = graphqlSharedClient(context)
    const conf = client.query({ query: StoreConfigDocument })

    const staticClient = graphqlSsrClient(context)

    const layout = staticClient.query({
        query: LayoutDocument,
        fetchPolicy: cacheFirst(staticClient),
    })

    const giveawayClassFormQuery = staticClient.query({
        query: AlekseonFormDocument,
        variables: {
            identifier: 'register-free-baking-class-form',
        },
    })

    const giveawayClassForm = (await giveawayClassFormQuery)?.data

    return {
        props: {
            ...(await layout).data,
            giveawayClassForm,
            apolloState: await conf.then(() => client.cache.extract()),
        },
        revalidate: 60 * 20,
    }
}
