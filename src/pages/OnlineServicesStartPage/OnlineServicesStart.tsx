import React, { FC } from "react";
import { Link } from "react-router-dom";
import ChevronRight from "@material-ui/icons/ChevronRight";
import { Feature, FeatureProps, InfoBox, Text } from "../../components";
import { Button } from "@welldigital/components";
import ChatIcon from "@material-ui/icons/Chat";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import CheckIcon from "@material-ui/icons/Check";
import ComputerIcon from "@material-ui/icons/Computer";
import LockIcon from "@material-ui/icons/Lock";
import { Box, Container, makeStyles } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { OnlineServiceParamTypes } from "../../app/store/reducer/online/types";
import GeneralLayout from "app/layouts/OnlineServices/GeneralLayout/GeneralLayout";

import { wellColors } from "@welldigital/components";

export const useStyles = makeStyles(() => ({
  paragraph: {
    color: wellColors.elixir[400],
  },
}));

export const OnlineServicesStart: FC = () => {
  const { onlineServiceId } = useParams<OnlineServiceParamTypes>();
  const classes = useStyles();
  const mainFeatures: FeatureProps[] = [
    {
      icon: ChatIcon,
      title: "Complete your online consultation",
      description: "Start your free, private online consultation now",
    },
    {
      icon: ShoppingCartIcon,
      title: "Choose your recommended treatment and quantity",
      description: "Based on your consultation, add your order to your basket",
    },
    {
      icon: CheckIcon,
      title: "Receive your product with free discreet delivery",
      description:
        "We'll send your order discreetly to your delivery address for free",
    },
  ];
  const infoFeatures: FeatureProps[] = [
    {
      icon: ComputerIcon,
      title: "No need to visit a pharmacist",
      description:
        "These questions are approved by our pharmacy team. This means you get the same service online as you would in one of our stores.",
    },
    {
      icon: LockIcon,
      title: "Private and secure",
      description:
        "All information you provide is completely confidential. Your responses are private and we won't ask for any personal details during your consultation. Remember the questions we ask are standard and nothing to be embarrassed about.",
    },
  ];

  return (
    <GeneralLayout>
      <Box py={6} px={2}>
        <Container maxWidth={"xs"} disableGutters>
          <Text variant={"beforeTitle"}>Let’s get started</Text>
          <Text variant={"title"}>Complete your free online consultation</Text>
          <Text variant={"paragraph"}>
            We need to ask you a few questions to find a suitable erectile
            dysfunction treatment for you.
          </Text>
          {mainFeatures.map((feature, k) => (
            <Feature key={k} {...feature} />
          ))}
          <Box marginY={"38px"}>
            <Button
              data-testid={"next-button"}
              fullWidth
              variant={"contained"}
              color={"primary"}
              endIcon={<ChevronRight />}
              size={"large"}
              // https://github.com/mui-org/material-ui/issues/22452 this is fixed in version 5 of material ui
              // @ts-ignore
              component={Link}
              to={`/order/${onlineServiceId}/consultation`}
            >
              Start your consultation
            </Button>
          </Box>
          <InfoBox>
            {infoFeatures.map((feature, k) => (
              <Feature key={k} {...feature} />
            ))}
          </InfoBox>
          <Text classes={{ root: classes.paragraph }}>
            Bestway National Chemists Limited is registered in England and
            Wales, trading as Well and Well Pharmacy. Our online pharmacy
            (well.co.uk) registration number is 9010492
            <br />
            <br />
            Our Superintendent Pharmacist is Iftkhar Ahmad Khan, FRPharmS.
            <br />
            GPhC Registration Number: 2041286.
          </Text>
        </Container>
      </Box>
    </GeneralLayout>
  );
};
