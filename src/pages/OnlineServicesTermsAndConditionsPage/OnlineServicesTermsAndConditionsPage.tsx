import React, { useEffect } from "react";
import { Grid, Container, Link } from "@material-ui/core";
import { Typography } from "@welldigital/components";
import ChevronRight from "@material-ui/icons/ChevronRight";
import { useStyles } from "./styles";
import {
  Row,
  List,
  ListItem,
} from "pages/OnlineServicesTermsAndConditionsPage/components";
import { analytics } from "@welldigital/ui-common";
import { eventsBuilder } from "utils/events";

const handleBackClick = () => window.close();

type Props = {};

export const OnlineServicesTermsAndConditionsPage: React.FC<Props> = () => {
  const classes = useStyles();

  useEffect(() => {
    analytics.trackEvent({
      flow: "ed",
      event: eventsBuilder.loginOptions.viewTermsAndConditions,
    });
  }, []);

  return (
    <>
      <div className={classes.header}>
        <Container maxWidth={"lg"}>
          <Grid container justify={"flex-end"}>
            <Typography>
              <span className={classes.backButton} onClick={handleBackClick}>
                Back
                <ChevronRight className={classes.linkIcon} />
              </span>
            </Typography>
          </Grid>
          <Grid container>
            <Typography variant={"h3"} className={classes.pageHeading}>
              Terms and Conditions – Sale of medicines by subscription
            </Typography>
          </Grid>
        </Container>
      </div>

      <div className={classes.pageContent}>
        <Container maxWidth={"lg"}>
          <Typography color={"textSecondary"}>
            <div className={classes.section}>
              <Row number={`1. `} isSubtitle>
                {` `}These therms
              </Row>

              <Row number={"1.1"} boldText={"What these terms cover."}>
                These are the terms and conditions on which we supply
                over-the-counter medication (the “
                <span className={classes.bold}>products”</span>) on a single
                order or subscription basis, via our website at{` `}
                <Link
                  className={classes.link}
                  href={"https://www.well.co.uk/pharmacy-services"}
                >
                  https://www.well.co.uk/pharmacy-services
                </Link>
                {` `}(the <span className={classes.bold}>"website"</span>).
              </Row>

              <Row number={"1.2"} boldText={"Why you should read them."}>
                Please read these terms carefully before you order products.
                These terms tell you who we are, how we will provide the
                products to you, how you and we may change or end our contract
                with you, what to do if there is a problem and other important
                information. If you think that there is a mistake in these
                terms, please contact us to discuss. By ordering products, you
                agree to these terms and conditions.
              </Row>

              <Row number={"2."} isSubtitle>
                INFORMATION ABOUT US AND HOW TO CONTACT US
              </Row>

              <Row number={"2.1"} boldText={"Who we are."}>
                We are Bestway National Chemists Limited, a company registered
                in England and Wales. Our company registration number is
                09225457 and our registered office is at Merchants Warehouse
                Castle Street, Castlefield, Manchester, M3 4LZ. Our registered
                VAT number is 146295159. All orders for products will be
                processed by our pharmacy at Healthcare Service Centre, Whittle
                Road, Meir Park, Stoke-on-Trent, Staffordshire, ST3 7UN, United
                Kingdom (General Pharmaceutical Council registration number
                9010492).
              </Row>

              <Row number={"2.2"} boldText={"How to contact us."}>
                For customer service queries please contact{` `}
                <Link className={classes.link} href={"mailto:hello@well.co.uk"}>
                  hello@well.co.uk
                </Link>
                {` `}or 01782597313. For complaints please phone 0333 010 2222
                or email{" "}
                <Link
                  className={classes.link}
                  href={"mailto:yourexperience@well.co.uk"}
                >
                  yourexperience@well.co.uk
                </Link>
                .
              </Row>

              <Row number={"2.3"} boldText={"How we may contact you."}>
                If we have to contact you we will usually do so by emailing you
                at the email address you provided to us when you registered. We
                may also contact you by telephone or by post using the contact
                details you provided to us when you registered.
              </Row>

              <Row number={"2.4"} boldText={"“Writing” includes emails."}>
                When we use the words “writing” or “written” in these terms,
                this includes emails.
              </Row>

              <Row number={"3."} isSubtitle>
                HOW TO PLACE ORDERS
              </Row>

              <Row number={"3.1"} boldText={"Consultation."}>
                All orders start with an online questionnaire to ascertain your
                suitability for the products. You can purchase the products
                through our website provided that you are male, at least
                eighteen (18) years old and a resident of the UK. If you wish to
                receive your products via subscription then you will need to
                sign up for an account. You will need to provide the details of
                a valid UK credit or debit card in your name.
              </Row>

              <Row number={"3.2"} boldText={"How we will accept your order."}>
                Our acceptance of your order will take place when we notify you
                in writing that we have accepted it, at which point a contract
                will come into existence between you and us. For one-off orders
                this will be in the form of a dispatch confirmation. For
                subscription orders this will be a subscription confirmation. In
                each case the confirmations will be provided by email, following
                conclusion of relevant checks by our pharmacist.
              </Row>

              <Row number={"3.3"} boldText={"Acceptance of orders."}>
                Acceptance of all orders is subject to the professional
                discretion of our pharmacists. You must provide accurate
                responses to the questions that we ask you about your health and
                current products to enable us to assess whether the products is
                suitable for you. In some cases, we will need to contact you
                separately and ask further questions to make this assessment,
                but we will let you know if this is the case. You must notify us
                as soon as possible if there are any changes to your health or
                current products which could affect your use of the products. If
                you subscribe for repeat orders, we will send you a reminder
                email every month asking you to confirm that there has been no
                change to the information you have provided to us concerning
                your health and current products. You must make any changes via
                your online account. If you respond to confirm that nothing has
                changed, we will continue to send your order. If you notify us
                that your condition or products has changed, or you do not
                respond, we may suspend or cancel your order and will notify you
                that we have.{" "}
                <span className={classes.bold}>Please note: </span> you cannot
                make a one-off purchase of products for a condition, whilst you
                currently have a live subscription in place for products to
                treat the same condition.
              </Row>

              <Row number={"3.4"} boldText={"If we cannot accept your order."}>
                If we are unable to accept your order, we will notify you of
                this and refund any charges made for the products. This might be
                because:
                <List>
                  <ListItem bullet={"a"}>
                    you do not meet the eligibility criteria for the products;
                  </ListItem>
                  <ListItem bullet={"b"}>
                    our pharmacists consider that the products is not suitable
                    for you;
                  </ListItem>
                  <ListItem bullet={"c"}>
                    the products is out of stock;
                  </ListItem>
                  <ListItem bullet={"d"}>
                    if you subscribe for repeat orders, you have confirmed to us
                    that there has been a change to the health and current
                    products details we hold for you and we consider this to
                    impact your eligibility for the products;
                  </ListItem>
                  <ListItem bullet={"e"}>
                    of unexpected limits on our resources which we could not
                    reasonably plan for; or
                  </ListItem>
                  <ListItem bullet={"f"}>
                    we have identified an error in the price or description of
                    the products.
                  </ListItem>
                </List>
              </Row>

              <Row
                number={"3.5"}
                boldText={"We only sell to customers based in the UK."}
              >
                Unfortunately, we do not accept orders from or deliver to
                addresses outside the UK.
              </Row>

              <Row number={"3.6"} boldText={"Your responsibilities."}>
                You are responsible for:
                <List>
                  <ListItem bullet={"a"}>
                    the information you provide to us about yourself, your
                    medical conditions and your products. You are responsible
                    for letting us know if there are any changes to this
                    information and for keeping it up to date. In particular,
                    you need to tell us about any changes in your medical
                    conditions, other medication that you are taking and your
                    delivery address. You promise that this information is
                    accurate and acknowledge that if you do not provide accurate
                    and up to date information you could be putting your health
                    at serious risk. You can update your information by
                    responding to our email if you have subscribed for repeat
                    orders, or by emailing us at{` `}
                    <Link
                      className={classes.link}
                      href={"mailto:hello@well.co.uk"}
                    >
                      hello@well.co.uk
                    </Link>
                    . You should review the patient information leaflet and
                    follow the clinical directions provided with the products
                    before using them;
                  </ListItem>
                  <ListItem bullet={"b"}>
                    notifying your GP and/or any other relevant healthcare
                    professional that you are using the products;
                  </ListItem>
                  <ListItem bullet={"c"}>
                    ensuring that your payment details are kept up to date. We
                    reserve the right not to process your order if your payment
                    details have expired or are invalid in any way. In such
                    cases, we will attempt to contact you to enable you to
                    provide updated information to allow us to process your
                    order.
                  </ListItem>
                </List>
              </Row>

              <Row number={"3.7"} boldText={"Your obligations."}>
                You agree:
                <List>
                  <ListItem bullet={"a"}>
                    to keep any details that you use to log in to the website
                    confidential and not share them with any other person;
                  </ListItem>
                  <ListItem bullet={"b"}>
                    to only order products for your own personal use. We do not
                    offer the facility for you to order products on behalf of
                    other people, including partners or other family members;
                  </ListItem>
                  <ListItem bullet={"c"}>
                    not to use our service for any unlawful purpose. We will not
                    be responsible for any misuse or abuse of the products;
                  </ListItem>
                  <ListItem bullet={"d"}>
                    that by placing an order with us you are confirming that:
                    <List marginBottom={"8px"}>
                      <ListItem bullet={"i"}>
                        you do not have any known allergies, sensitivities or
                        intolerance to the products;
                      </ListItem>
                      <ListItem bullet={"ii"}>
                        you do not have any known medical conditions which
                        predispose you to adverse reactions to the products;
                      </ListItem>
                      <ListItem bullet={"iii"}>
                        you are not taking any concurrent products with which
                        the products is likely to interact; and
                      </ListItem>
                      <ListItem bullet={"iv"}>
                        you consent to your order being posted through your
                        letterbox and confirm that there is no risk to children,
                        pets, vulnerable adults or other third parties as a
                        result of your order being delivered in this way;
                      </ListItem>
                    </List>
                  </ListItem>
                  <ListItem bullet={"e"}>
                    not to use our website in any way that will damage, impair
                    or render it less efficient;
                  </ListItem>
                  <ListItem bullet={"f"}>
                    that your use of our website and service does not grant you
                    any rights in relation to our intellectual property.
                  </ListItem>
                </List>
              </Row>

              <Row number={"4."} isSubtitle>
                YOUR RIGHTS TO MAKE CHANGES
              </Row>

              <Row number={"4.1"}>
                If you wish to make a change to your order please contact us as
                soon as possible. We will let you know if the change is
                possible. If it is possible we will let you know about any
                changes to the price of the products, the timing of supply or
                anything else which would be necessary as a result of your
                requested change and ask you to confirm whether you wish to go
                ahead with the change. If we cannot make the change or the
                consequences of making the change are unacceptable to you, you
                may be able to end the contract (see clause 8).
              </Row>

              <Row number={"5."} isSubtitle>
                OUR RIGHTS TO MAKE CHANGES
              </Row>

              <Row number={"5.1"}>
                We may make changes to your order, the products or these terms
                and conditions:
                <List>
                  <ListItem bullet={"a"}>
                    to reflect changes in relevant laws and regulatory
                    requirements; and
                  </ListItem>
                  <ListItem bullet={"b"}>
                    to implement minor technical adjustments and improvements,
                    for example to address a security threat. These changes will
                    not affect your use of the products.
                  </ListItem>
                </List>
              </Row>

              <Row number={"5.2"}>
                We will not make any other changes to your order, the products
                or these terms and conditions without discussing such changes
                with you first. If we do make any such changes, we will notify
                you before the change takes effect and you may then contact us
                to end the contract and receive a refund for any products paid
                for but not received.
              </Row>

              <Row number={"6."} isSubtitle>
                THE PRODUCTS
              </Row>

              <Row
                number={"6.1"}
                boldText={"Products may vary slightly from their pictures."}
              >
                Products may vary slightly from their pictures. The images of
                the products on our website are for illustrative purposes only.
                Although we have made every effort to display the colours
                accurately, we cannot guarantee that a device's display of the
                colours accurately reflects the colour of the products. Your
                products may vary slightly from those images.
              </Row>

              <Row number={"6.2"} boldText={"Packaging may vary."}>
                The packaging of the products may vary from that shown in images
                on our website.
              </Row>

              <Row number={"7."} isSubtitle>
                PROVIDING THE PRODUCTS
              </Row>

              <Row number={"7.1"} boldText={"Delivery costs."}>
                The costs of delivery (if applicable) will be as displayed to
                you at the checkout stage before you place your order. If you
                subscribe for repeat orders and pay through our automatic
                renewal service we reserve the right to change our delivery
                costs at any time upon giving you 10 working days’ notice in
                writing in advance of any such change. If you are not happy with
                such change, you may then contact us to end the contract and
                receive a refund for any products paid for but not received.
              </Row>

              <Row number={"7.2"} boldText={"Delivery of the products. "}>
                We will deliver the products to you as soon as reasonably
                possible or, where you subscribe for repeat orders, at monthly
                intervals (each a “
                <span className={classes.bold}>subscription month</span>”),
                starting from the date of your first order. Unless we notify you
                otherwise, all products are sent by us using Royal Mail, and
                should be delivered to you within 5 working days of us
                dispatching your order. Subscriptions are valid for a year from
                the date of first order.
              </Row>

              <Row number={"7.3"}>
                We cannot guarantee the exact time and day of delivery and
                recommend that you allow for up to five working days for your
                order to arrive once it has been processed.
              </Row>

              <Row
                number={"7.4"}
                boldText={
                  "If you are not at home when the products are delivered."
                }
              >
                If no one is available at your address to take delivery and the
                products cannot be posted through your letterbox, they may be
                left with a neighbour and, if that’s not possible, the courier
                should leave you a note informing you of how to rearrange
                delivery or collect your order from a local depot.
              </Row>

              <Row
                number={"7.5"}
                boldText={"If you do not re-arrange delivery."}
              >
                If you do not collect the products from the courier or if, after
                a failed delivery to you, you do not re-arrange delivery or
                collect them from a delivery depot we will contact you for
                further instructions and may charge you for storage costs and
                any further delivery costs. If, despite our reasonable efforts,
                we are unable to contact you or re-arrange delivery or
                collection we may end the contract.
              </Row>

              <Row
                number={"7.6"}
                boldText={
                  "We are not responsible for delays outside our control."
                }
              >
                If our supply of the products is delayed by an event outside our
                control then we will contact you as soon as possible to let you
                know and we will take steps to minimise the effect of the delay.
                Provided we do this we will not be liable for delays caused by
                the event, but if there is a risk of substantial delay you may
                contact us to end the contract and receive a refund for any
                products you have paid for but not received.
              </Row>

              <Row
                number={"7.7"}
                boldText={"When you become responsible for the products."}
              >
                The products will be your responsibility from the time that they
                are delivered to you.
              </Row>

              <Row number={"7.8"} boldText={"When you own the products."}>
                You own the products once we have received payment in full.
              </Row>

              <Row
                number={"7.9"}
                boldText={
                  "What will happen if you do not give required information to us?"
                }
              >
                We need certain information from you so that we can supply the
                products to you, for example, the information that we ask you to
                provide about your health and products when you register with us
                and, if you subscribe for repeat orders, any changes or updates
                to this information (see clauses 3.3and 3.6(a)). If you do not
                give us this information or if you give us incomplete or
                incorrect information, we will not be able to supply the
                products to you and, if you subscribe for repeat orders, may end
                the contract (see clause 9.1(a)). We will not be responsible for
                any failure to supply the products if this is caused by you not
                giving us the information we need to process your order.
              </Row>

              <Row
                number={"7.10"}
                boldText={
                  "Reasons we may suspend the supply of the products to you."
                }
              >
                We may have to suspend the supply of the products to:
                <List>
                  <ListItem bullet={"a"}>
                    deal with technical problems or make minor technical
                    changes;
                  </ListItem>
                  <ListItem bullet={"a"}>
                    update the products to reflect changes in relevant laws and
                    regulatory requirements;
                  </ListItem>
                  <ListItem bullet={"a"}>
                    make changes to the products as notified by us to you (see
                    clause 5).
                  </ListItem>
                </List>
              </Row>

              <Row
                number={"7.11"}
                boldText={
                  "Your rights if we suspend the supply of the products."
                }
              >
                We will contact you in advance to tell you we will be suspending
                supply of the products, unless the problem is urgent or an
                emergency. We may need to suspend the supply of the products if,
                for example, the card details that you provided when you
                registered are no longer valid or your payment isn’t authorised.
                You may contact us to end the contract for the products if we
                suspend the supply, or tell you we are going to suspend it, in
                each case for a period of more than 30 days and we will refund
                any sums you have paid in advance for the products in respect of
                the period after you end the contract.
              </Row>

              <Row
                number={"7.12"}
                boldText={
                  "We may also suspend supply of the products if you do not pay."
                }
              >
                If you do not pay us for the products when you are supposed to (
                <span className={classes.bold}>see</span> clause 11.4) and you
                still do not make payment within 14 days of us reminding you
                that payment is due, we may suspend supply of the products until
                you have paid us the outstanding amounts. We will contact you to
                tell you we are suspending supply of the products. We will not
                suspend the products where you reasonably dispute the unpaid
                invoice (<span className={classes.bold}>see</span> clause 11.5).
                We will not charge you for the products during the period for
                which they are suspended.
              </Row>

              <Row number={"8."} isSubtitle>
                YOUR RIGHTS TO CANCEL
              </Row>

              <Row number={"8.1"} boldText={"Cancelling a one-off order."}>
                You can cancel a one-off order at any time before we dispatch it
                by contacting us via{" "}
                <Link
                  className={classes.link}
                  href={"mailto:orders@geteddie.co.uk"}
                >
                  email
                </Link>
                . You will receive a full refund using the method of payment
                that you used to pay for the products.
              </Row>

              <Row number={"8.2"} boldText={"Cancelling a subscription."}>
                If you want to cancel a subscription order, just contact us to
                let us know. The subscription will end at the end of the
                subscription month in which you notify us, or the following
                subscription month, where we have already taken the following
                subscription month’s payment from you (or are irrevocably about
                to do so).
              </Row>

              <Row number={"0.0"}>
                Unfortunately, once your order has been dispatched, you will
                only be able to cancel it if what you have bought is faulty or
                misdescribed, in which event we will replace or refund (at our
                discretion) the faulty or misdescribed products. We will pay the
                costs of return if the products are faulty or misdescribed.
              </Row>

              <Row number={"9."} isSubtitle>
                OUR RIGHTS TO END THE CONTRACT
              </Row>

              <Row
                number={"9.1"}
                boldText={"We may end the contract if you break it."}
              >
                We may end the contract at any time by writing to you if you do
                not:
                <List>
                  <ListItem bullet={"a"}>
                    within a reasonable time of us asking for it, provide us
                    with information that is necessary for us to provide the
                    products; or
                  </ListItem>
                  <ListItem bullet={"b"}>
                    within a reasonable time, allow us to deliver the products
                    to you or collect them from us.
                  </ListItem>
                </List>
              </Row>

              <Row number={"9.2"} boldText={"We may withdraw the products."}>
                We may write to you to let you know that we are going to stop
                providing the products if you sign up to receive the products on
                a subscription basis. We will let you know at least 30 days in
                advance of our stopping the supply of the products (excluding
                where we are cancelling the prescription due to a change in your
                information (see clause 3.6(a)) and will refund any sums you
                have paid in advance for products which will not be provided.
              </Row>

              <Row number={"9.3"}>
                We reserve the right to suspend or terminate your access to our
                services at any time without notice if we have reasonable
                grounds to believe that you have breached any of these terms.
              </Row>

              <Row number={"10."} isSubtitle>
                IF THERE IS A PROBLEM WITH THE PRODUCTS
              </Row>

              <Row number={"10.1"} boldText={"How to tell us about problems."}>
                If you have any questions or complaints about the products,
                please contact us using the details set out in clause 2.2.
              </Row>

              <Row number={"10.2"}>
                We may refer you to one of our pharmacists if our customer
                services team cannot provide the information that you need. We
                may also direct you to your GP surgery and or Royal Mail if
                appropriate.
              </Row>

              <Row number={"10.3"}>
                A copy of our complaints procedure is available on{" "}
                <Link
                  className={classes.link}
                  href={"https://www.well.co.uk/information/complaints-policy/"}
                >
                  our website
                </Link>
                .
              </Row>

              <Row number={"10.4"} boldText={"Summary of your legal rights."}>
                We are under a legal duty to supply products that are in
                conformity with this contract. The Consumer Rights Act 2015 says
                goods must be as described, fit for purpose and of satisfactory
                quality. These are subject to certain exceptions. For detailed
                information about your legal rights as a consumer please visit
                the Citizens Advice website www.adviceguide.org.uk or call 03454
                04 05 06. Nothing in these terms will affect your legal rights.
              </Row>

              <Row number={"11."} isSubtitle>
                PRICE AND PAYMENT
              </Row>

              <Row number={"11.1"} boldText={"Where to find the price."}>
                The price of the products (which includes VAT) will be the price
                indicated on the order pages when you placed your order. If you
                subscribe for repeat orders and pay through our automatic
                renewal service we reserve the right to increase our prices at
                any time upon giving you at least 10 working days’ notice in
                writing in advance of any such price increase. If you are not
                happy with such change, you may then contact us to end the
                contract and receive a refund for any products paid for but not
                received. We take all reasonable care to ensure that the price
                of the products advised to you is correct. However please see
                clause 11.3 for what happens if we discover an error in the
                price of the products you order.
              </Row>

              <Row
                number={"11.2"}
                boldText={"We will pass on changes in the rate of VAT."}
              >
                If the rate of VAT changes between your order date and the date
                we supply the products, we will adjust the rate of VAT that you
                pay, unless you have already paid for the products in full
                before the change in the rate of VAT takes effect.
              </Row>

              <Row
                number={"11.3"}
                boldText={"What happens if we got the price wrong?"}
              >
                It is always possible that, despite our best efforts, some of
                the products we sell may be incorrectly priced. We will normally
                check prices before accepting your order so that, where the
                product’s correct price at your order date is less than our
                stated price at your order date, we will charge the lower
                amount. If the product’s correct price at your order date is
                higher than the price stated to you, we will contact you for
                your instructions before we accept your order. If we accept and
                process your order where a pricing error is obvious and
                unmistakable and could reasonably have been recognised by you as
                a mispricing, we may end the contract, refund you any sums you
                have paid and require the return of any goods provided to you.
              </Row>

              <Row
                number={"11.4"}
                boldText={"When you must pay and how you must pay."}
              >
                We accept payment by all major debit and credit cards. You must
                pay for the products in full (if they are subject to a charge)
                before we dispatch them. We will not charge your credit or debit
                card until we dispatch the products to you. We use a third party
                platform to process our payments. When you provide your credit
                or debit card details, the third party may perform a
                pre-authorisation on your card to ensure that the payment
                details that you provide are correct. We do not process, handle
                or retain any card details that you provide but the third party
                platform that we use may ask for your consent to remember your
                card details for future purchases.
              </Row>

              <Row
                number={"11.5"}
                boldText={"What to do if you think an invoice is wrong."}
              >
                If you think an invoice is wrong please contact us promptly to
                let us know
              </Row>

              <Row number={"12."} isSubtitle>
                OUR RESPONSIBILITY FOR LOSS OR DAMAGE SUFFERED BY YOU
              </Row>

              <Row
                number={"12.1"}
                boldText={
                  "We are responsible to you for foreseeable loss and damage caused by us."
                }
              >
                If we fail to comply with these terms, we are responsible for
                loss or damage you suffer that is a foreseeable result of our
                breaking this contract or our failing to use reasonable care and
                skill, but we are not responsible for any loss or damage that is
                not foreseeable or for any failures or delays caused by you.
                Loss or damage is foreseeable if either it is obvious that it
                will happen or if, at the time the contract was made, both we
                and you knew it might happen, for example, if you discussed it
                with us during the sales process.
              </Row>

              <Row
                number={"12.2"}
                boldText={
                  "We do not exclude or limit in any way our liability to you where it would be unlawful to do so. "
                }
              >
                This includes liability for death or personal injury caused by
                our negligence or the negligence of our employees, agents or
                subcontractors; for fraud or fraudulent misrepresentation; for
                breach of your legal rights in relation to the products as
                summarised at clause 10.4; and for defective products under the
                Consumer Protection Act 1987.
              </Row>

              <Row
                number={"12.3"}
                boldText={"We are not liable for business losses."}
              >
                We only supply the products for domestic and private use. If you
                use the products for any commercial, business or re-sale purpose
                we will have no liability to you for any loss of profit, loss of
                business, business interruption, or loss of business
                opportunity.
              </Row>

              <Row number={"13."} isSubtitle>
                HOW WE MAY USE YOUR PERSONAL INFORMATION
              </Row>

              <Row
                number={"13.1"}
                boldText={"How we may use your personal information."}
              >
                We will only use your personal information as set out in our
                {` `}
                <Link
                  className={classes.link}
                  href={"https://geteddie.co.uk/privacy"}
                >
                  Privacy Notice
                </Link>
                .
              </Row>

              <Row number={"14."} isSubtitle>
                OTHER IMPORTANT TERMS
              </Row>

              <Row
                number={"14.1"}
                boldText={"We may transfer this contract to someone else."}
              >
                We may transfer our rights and obligations under these terms to
                another organisation. We will always tell you in writing if this
                happens and we will ensure that the transfer will not affect
                your rights under the contract.
              </Row>

              <Row
                number={"14.2"}
                boldText={"Nobody else has any rights under this contract."}
              >
                Nobody else has any rights under this contract. This contract is
                between you and us. No other person shall have any rights to
                enforce any of its terms. Neither of us will need to get the
                agreement of any other person in order to end the contract or
                make any changes to these terms.
              </Row>

              <Row
                number={"14.3"}
                boldText={
                  "If a court finds part of this contract illegal, the rest will continue in force. "
                }
              >
                Each of the paragraphs of these terms operates separately. If
                any court or relevant authority decides that any of them are
                unlawful, the remaining paragraphs will remain in full force and
                effect.
              </Row>

              <Row
                number={"14.4"}
                boldText={
                  "Even if we delay in enforcing this contract, we can still enforce it later. "
                }
              >
                If we do not insist immediately that you do anything you are
                required to do under these terms, or if we delay in taking steps
                against you in respect of your breaking this contract, that will
                not mean that you do not have to do those things and it will not
                prevent us taking steps against you at a later date. For
                example, if you miss a payment and we do not chase you but we
                continue to provide the products, we can still require you to
                make the payment at a later date.
              </Row>

              <Row
                number={"14.5"}
                boldText={
                  "Which laws apply to this contract and where you can bring legal proceedings. "
                }
              >
                These terms are governed by the laws of England and Wales and
                you can bring legal proceedings in respect of the products in
                the English and Welsh courts. If you live in Scotland you can
                bring legal proceedings in respect of the products in either the
                Scottish or the English and Welsh courts. If you live in
                Northern Ireland you can bring legal proceedings in respect of
                the products in either the Northern Irish or the English and
                Welsh courts.
              </Row>
            </div>
          </Typography>
        </Container>
      </div>
    </>
  );
};

export default OnlineServicesTermsAndConditionsPage;
