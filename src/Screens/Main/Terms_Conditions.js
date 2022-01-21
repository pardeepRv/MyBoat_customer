import React, { Component,useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    ScrollView,useWindowDimensions,Dimensions,
    FlatList,
    Image,
    I18nManager,
    TextInput
} from 'react-native';
import {
    Icon,
    Input,
    Card
} from 'react-native-elements';
import {Colors, FontFamily, Sizes } from '../../Constants/Constants';
import { useNavigation } from '@react-navigation/core';
import Header from '../../Components/Header';
import AsyncStorage  from "@react-native-community/async-storage";
import { config } from '../../Provider/configProvider';
import { msgProvider, msgTitle, msgText } from '../../Provider/messageProvider';
import { Lang_chg } from '../../Provider/Language_provider'
import { apifuntion } from '../../Provider/apiProvider';
import HTML from "react-native-render-html";
import { WebView } from 'react-native-webview';







export  default  class  Terms_Conditions extends Component{

    constructor(props){
        super(props);
        this.state ={
            about_us:[],
            terms_cond:[],
            privacy:[],
            terms:false,
            policy:false,
            about:false,
            type:this.props.route.params.type,
        }

    }



    componentDidMount(){
       // this.getData('user_arr');

    //    let d= useWindowDimensions();

    console.log(this.state.type)

        console.log('dimention ',Dimensions.get('window').width)


        if(this.state.type=='3'){
          this.setState({about:true})
          }
          else if(this.state.type=='2'){
  
          this.setState({policy:true})
          }
  
          else if(this.state.type=='1'){
          this.setState({terms:true})
        
          }
        
    }


    getData = async (key) => {
            
        console.log('local '+key)
        try {
          const value = await AsyncStorage.getItem(key);

//          console.log('local '+value)
          
           //  console.log('array ',arrayData.email);
          if(value !== null) {
           
            const arrayData = JSON.parse(value);

            console.log(arrayData)
            //this.setState({localData:arrayData})
           this.ProfileDetail(arrayData.user_id)
          
          
          }
        } catch(e) {
          // error reading value
        }
      }


      async ProfileDetail(user_id) {

        console.log('user ',user_id)

        let url = config.baseURL +'get_all_content.php?user_id_post='+user_id+'&user_type=1';
        try {
          const response = await fetch(url);
          const json = await response.json(); 
          //console.log('json  ',json.content_arr[2])

     if(json.success=='true'){

        if(this.state.type=='3'){
        this.setState({about_us:json.content_arr[0]['content'],about:true})
        }
        else if(this.state.type=='2'){

        this.setState({privacy:json.content_arr[1]['content'],policy:true})
        }

        else if(this.state.type=='1'){
        this.setState({terms_cond:json.content_arr[2]['content'],terms:true})
      
        }
        // this.setState({name:json.user_details.f_name})


      // console.log(this.state.terms_cond)

      }else{

      }
          
         // console.log(this.state.img)
        } catch (error) {
          console.log(error);
        } finally {
          this.setState({ isLoading: false });
        }
      }




    render() {
       // const {width: contentWidth} = useWindowDimensions();

        //console.log(contentWidth)
      //  const width =Dimensions.get('window').width;
       const html1= this.state.privacy;
       const html2=this.state.terms_cond;
       const html3=this.state.about_us;

console.log(html2[0])


    return(
        <View style={{flex:1,backgroundColor:Colors.white}}>

          <ScrollView>

{this.state.terms &&


            <Header backBtn={true} imgBack={true} name="Terms & Conditions" />

}

{this.state.about &&


            <Header backBtn={true} imgBack={true} name="About Us" />

}


{this.state.policy &&


            <Header backBtn={true} imgBack={true} name="Privacy & Policy" />

}
            <View style={subrata.SEC2}>
             
             {this.state.terms &&

                   
                      <Text style={{ textAlign: "justify",padding:10,fontSize:15,fontFamily:'Montserrat-Regular'}} > 
                        
                        <Text style={subrata.heading}>Terms & Conditions {'\n'} {'\n'}</Text>

                        
                        Introduction TCs
                        {'\n'} {'\n'}
These terms and conditions, as may be amended from time to time, apply to all our services directly or indirectly (through distributors) made available online, through any mobile device, by email, or by telephone. By accessing, browsing, and using our (mobile) website or any of our applications through whatever platform (hereafter collectively referred to as the "Platform") and/or by completing a reservation, you acknowledge and agree to have read, understood, and agreed to the terms and conditions set out below (including the privacy statement).
{'\n'} {'\n'}
These pages, the content, and infrastructure of these pages and the online reservation service (including the facilitation of payment service) provided by us on these pages and through the website are owned, operated, and provided by MyBoat and are provided for your personal, non-commercial (B2C) use only, subject to the terms and conditions set out below. The relationship that we have with the Trip Providers are governed by separate terms and conditions which govern the (B2B) commercial relationship we have with each of these Trip Providers. Each Trip Provider acts in a professional manner. MyBoat when making its product and/or service available on or through MyBoat (both for its business-to-business ("B2B") and/or business-to-consumer ("B2C") relationship). Note that Trip Providers may have, declare applicable, and/or require (acceptance of) – in addition to the policies and fine print as disclosed on the website, their own (delivery/shipping/carriage/usage) terms and conditions and house rules for the use, access, and consummation of the Trip (which may include certain disclaimers and limitations of liability).

{'\n'} {'\n'}

Definitions
{'\n'} {'\n'}
"MyBoat ," "us," "we," or "our" means MyBoat a personal owner in kuwait. "Platform" means the (mobile) website and app on which the Trip Service is made available owned, controlled, managed, maintained, and/or hosted by MyBoat. "Trip" means the various different travel products and services that can be ordered, acquired, purchased, bought, paid, rented, provided, reserved, combined, or consummated by you from the Trip Provider.

{'\n'} {'\n'}

"Trip Provider" means the provider of trips (e.g. tour, fishing, anniversary trip, transportations), trip operators, and any other travel or related product or service as from time to time available for Trip Reservation on the Platform (whether B2B or B2C).

{'\n'} {'\n'}

"Trip Service" means the online purchase, order, (facilitated) payment, or reservation service as offered or enabled by MyBoat in respect to various products and services as from time to time made available by Trip Providers on the Platform.

{'\n'} {'\n'}

"Trip Reservation" means the order, purchase, payment, booking, or reservation of a Trip.

{'\n'} {'\n'}

1. Scope & Nature of Our Service

{'\n'} {'\n'}

Through the Platform, we (MyBoat) provide an online platform through which Trip Providers—in their professional conduct of business (i.e. B2C or B2B)—can advertise, market, sell, promote, and/or offer (as applicable) their products and service for order, purchase, reservation, rent, or hire, and through which relevant visitors of the Platform can discover, search, compare, and make an order, reservation, purchase, or payment (i.e. the Trip Service). By using or utilizing the Trip Service (e.g. by making a Trip Reservation through the Trip Service), you enter into a direct (legally binding) contractual relationship with the Trip Provider with which you make a reservation or purchase a product or service (as applicable). From the point at which you make your Trip Reservation, we act solely as an intermediary between you and the Trip Provider, transmitting the relevant details of your Trip Reservation to the relevant Trip Provider(s) and sending you a confirmation email for and on behalf of the Trip Provider. MyBoat does not (re)sell, rent out, offer any (trips) product or service.

{'\n'} {'\n'}

When rendering our Trip Service, the information that we disclose is based on the information provided to us by Trip Providers. As such, the Trip Providers that market and promote their Trips on the Platform are given access to our systems and Extranet through which they are fully responsible for updating all rates/fees/prices, availability, policies, conditions, and other relevant information that gets displayed on our Platform. Although we will use reasonable skill and care in performing our Trip Service, we will not verify and cannot guarantee that all information is accurate, complete, or correct, nor can we be held responsible for any errors (including manifest and typographical errors), any interruptions (whether due to any (temporary and/or partial) breakdown, repair, upgrade, or maintenance of our Platform or otherwise), inaccurate, misleading, or untrue information, nor non-delivery of information. Each Trip Provider remains responsible at all times for the accuracy, completeness, and correctness of the (descriptive) information (including the rates/fees/prices, policies, conditions, and availability) displayed on our Platform. Our Platform does not constitute and should not be regarded as a recommendation or endorsement of the quality, service level, qualification, (star) rating, or type of trip of any Trip Provider (or its facilities, venue, vehicles, (main or supplemental) products or services) made available, unless explicitly indicated or set out otherwise.

{'\n'} {'\n'}

Our Trip Service is made available for personal and non-commercial use only. Therefore, you are not allowed to resell, deep link, use, copy, monitor (e.g. spider, scrape), display, download, or reproduce any content or information, software, reservations, tickets, products, or services available on our Platform for any commercial or competitive activity or purpose.

{'\n'} {'\n'}

2. Prices, We Price Match, promotion program, and offers facilitated by a partner company

{'\n'} {'\n'}

The prices as offered by the Trip Providers on our Platform are highly competitive. All prices for your Trip are displayed including VAT/sales tax and all other taxes (subject to change of such taxes) and fees, unless stated differently on our Platform or the confirmation email/ticket. Ticket prices are per person or group and subject to validity or expiration as indicated on the ticket, if applicable. Applicable fees and taxes (including tourist/city tax) may be charged by the Trip Provider in the event of a no-show or cancellation.

{'\n'} {'\n'}

Sometimes cheaper rates are available on our Platform for a specific trip, product, or service, however, these rates made available by Trip Providers may carry special restrictions and conditions, for example non-cancelable and non-refundable. Check the relevant product, service, and reservation conditions and details thoroughly for any such conditions prior to making your reservation.

{'\n'} {'\n'}

We want you to pay the lowest price possible for your product and service of choice. Should you find your property of choice booked through the Platform, with the same Trip conditions, at a lower rate on the Internet after you have made a reservation through us, we will match the difference between our rate and the lower rate under the terms and conditions of the We Price Match. Our We Price Match promise does not apply to non-trip related products and services.

{'\n'} {'\n'}

The currency converter is for information purposes only and should not be relied upon as accurate and real time; actual rates may vary.

{'\n'} {'\n'}

Obvious errors and mistakes (including misprints) are not binding.

{'\n'} {'\n'}

All special offers and promotions are marked as such. If they are not labeled as such, you cannot derive any rights in the event of obvious errors or mistakes.

{'\n'} {'\n'}

promotion program

{'\n'} {'\n'}

The promotion rate is a discounted rate offered by participating boats for certain dates / trip types.

{'\n'} {'\n'}

The promotion rate is for members of the MyBoat promotion program. The promotion program is open to anyone that has an account on the Platform. There are no membership fees, and all you need to do to become a member is complete register membership and the promotion rates are for that individual member and are non-transferable. Membership can also be linked to specific campaigns or incentives, as occasionally launched or communicated per MyBoat sole discretion.

{'\n'} {'\n'}

MyBoat reserves the right to revoke and cancel the promotion program membership of any individual in the event of abuse, such as violation of these terms & conditions and / or use of invalid credit cards. MyBoat furthermore reserves the right to revoke and cancel the promotion membership of any individual who engages in inappropriate behavior, such as violence, threat, harassment, discrimination, obscenity, or fraud in relation to MyBoat (or its employees and agents) and / or the service provider (or its employees and agents).

{'\n'} {'\n'}

The promotion rate cannot be combined or used with other discounts (unless approved by the provider or indicated otherwise). MyBoat may, at its discretion, (partially) alter, limit, or modify the promotion program structure or any other feature of the program (including but not limited to the (status of the) subject promotion level(s)), for any reason, without prior notice.

{'\n'} {'\n'}

The promotion membership is linked to your account on MyBoat and will not expire or otherwise terminate unless you terminate, close, delete, or otherwise revoke your account. Without notice to you, MyBoat also reserves the right to “unregister" or otherwise disable an account that is inactive. An inactive account is defined as an account that has not made a reservation for more than five (2) years. In the event that your account is might be disabled, you will no longer be eligible for the promotion benefits. You may reactivate your account by making a qualifying reservation using your MyBoat account.

{'\n'} {'\n'}

Partner offer

{'\n'} {'\n'}

MyBoat may display offers that are not directly sourced from Trip Providers, but are facilitated by a MyBoat partner company, such as another platform (Partner offer). Partner offers will be clearly displayed and distinguished from the regular offers directly sourced from Trip Providers and have the following special conditions, unless mentioned otherwise on our Platform:

{'\n'} {'\n'}

Price policy: As displayed on our Platform.
{'\n'} {'\n'}
Pay in advance: You’ll pay securely with MyBoat at the time of the booking.
{'\n'} {'\n'}
No modifications: Once your booking is complete, any changes to your personal or booking details won't be possible. Requests can be made directly with the admin/or on his behalf but are not guaranteed.
{'\n'} {'\n'}
Can't combine with other offers: Other promotions, incentives, and rewards are not eligible on the booking.
{'\n'} {'\n'}
No guest review: It’s not possible to leave a guest review on our Platform.
{'\n'} {'\n'}
3. Privacy and Cookies
{'\n'} {'\n'}
MyBoat respects your privacy. Please take a look at our Privacy and Cookies Policy for further information.

{'\n'} {'\n'}

4. Free or little charge for consumers, Trip Providers pay the rest!

{'\n'} {'\n'}

Unless indicated otherwise, our service is free of charge might be very little charge for consumers because, unlike many other parties, we will not charge you for all our Trip Service or add too much additional (reservation) fees to the rate. You will pay the Trip Provider the relevant amount as indicated in the Trip Reservation (plus—insofar not included in the price—relevant applicable taxes, levies, and fees (if applicable)).

{'\n'} {'\n'}

Trip Providers pay a commission (being a small percentage of the product price (e.g. book price)) to MyBoat after the end user has consummated the service or product of the Trip Provider (e.g. after the guest has finished the trip at (and paid) the trips). Trip Providers can improve their ranking by increasing their commission (Visibility Booster). The use of the Visibility Booster (by increasing the commission in return for a better position in the ranking) is at each Trip Provider's discretion and may be used from time to time and product to product offered. The algorithm of the ranking will take an increase in commission into account when determining the Default Ranking. Preferred partners pay a higher commission in return for a better position in the ranking.

{'\n'} {'\n'}

Only Trip Providers which have a commercial relationship with MyBoat (through an agreement) will be made available on Platform (for their B2B and/or B2C promotion of their product). MyBoat is not an open platform (like Amazon or eBay) where end users can make their product available (no C2C platform); MyBoat does not allow non-professional parties to offer or sell their products on or through MyBoat .
{'\n'} {'\n'}
some might be apply or changed in this topic

{'\n'} {'\n'}

5. Credit Card or Bank Transfer
{'\n'} {'\n'}
If applicable and available, certain Trip Providers offer the opportunity for Trip Reservations to be paid (wholly or partly and as required under the payment policy of the Trip Provider) to the Trip Provider during the Trip Reservation process, by means of secure online payment (all to the extent offered and supported by your bank). For certain products and services, MyBoat facilitates (through third party payment processors) the payment of the relevant product or service (i.e. the payment facilitation service) for and on behalf of the Trip Provider (MyBoat never acts nor operates as the merchant of record). Payment is safely processed from your credit/debit card or bank account to the bank account of the trip provider through a third party payment processor. Any payment facilitated by us for and on behalf of, and transferred to the Trip Provider will in each case constitute a payment of (part of) the booking price by you of the relevant product or service in final settlement of such (partial) due and payable price and you cannot reclaim such paid monies.
{'\n'} {'\n'}


For certain (non-refundable) rates or special offers, note that Trip Providers may require that payment be made upfront by wire transfer (if available) or by credit card, and therefore your credit card may be pre-authorized or charged (sometimes without any option for refund) upon making the Trip Reservation. Check the (reservation) details of your product or service of choice thoroughly for any such conditions prior to making your Trip Reservation. You will not hold MyBoat liable or responsible for any (authorized, (allegedly) unauthorized or wrong) charge by the Trip Provider and not (re)claim any amount for any valid or authorized charge by the Trip Provider (including for pre-paid rates, no-show, and chargeable cancellation) of your credit card.

{'\n'} {'\n'}

In the event of credit card fraud or unauthorized use of your credit card by third parties, most banks and credit card companies bear the risk and cover all charges resulting from such fraud or misuse, which may sometimes be subject to a deductible (usually set at EUR 5 (or the equivalent in your local currency)). In the event that your credit card company or bank charges the deductible from you due to unauthorized transactions resulting from a reservation made on our Platform, we will pay you this deductible, up to an aggregate amount of EUR 5 (or the equivalent in your local currency). In order to indemnify you, please report fraud to your credit card provider (in accordance with its reporting rules and procedures) and contact us immediately. Please provide us with evidence of the charged deductible (e.g. policy of the credit card company). This indemnification only applies to credit card reservations made using MyBoat secure server and the unauthorized use of your credit card resulting through our default or negligence and through no fault of your own while using the secure server.

{'\n'} {'\n'}

6. Prepayment, Cancellation, No-shows, and The Fine Print

{'\n'} {'\n'}

By making a Trip Reservation with a Trip Provider, you accept and agree to the relevant cancellation and no-show policy of that Trip Provider, and to any additional (delivery) terms and conditions of the Trip Provider that may apply to your Trip (including the fine print of the Trip Provider made available on our Platform and the relevant house rules of the Trip Provider), including for services rendered and/or products offered by the Trip Provider. The relevant (delivery/purchase/use/carrier) terms and conditions of a Trip Provider can be obtained with the relevant Trip Provider. The general cancellation and no-show policy of each Trip Provider is made available on our Platform on the Trip Provider information pages, during the reservation procedure and in the confirmation email or ticket (if applicable). Note that certain rates, fees, or special offers are not eligible for cancellation, refund, or change. Applicable city/tourist tax may still be charged by the Trip Provider in the event of a no-show or charged cancellation. Check the (reservation) details of your product or service of choice thoroughly for any such conditions prior to making your reservation. Note that a Trip Reservation which requires down payment or (wholly or partly) prepayment may be canceled (without a prior notice of default or warning) insofar the relevant (remaining) amount(s) cannot be collected in full on the relevant due or payment date in accordance with the relevant payment policy of the Trip Provider and the reservation. Cancellation and prepayment policies may vary per segment, product, or service of each Trip. Carefully read The Fine Print (below the Trip types or at the bottom of each Trip Provider page on our Platform) and important information in your reservation confirmation for additional policies as may be applied by the Trip Provider (e.g. in respect of age requirement, security deposit, non-cancellation/additional supplements for group bookings, cards accepted). Late payment, wrong bank, debit or credit card details, invalid credit/debit cards, or insufficient funds are for your own risk and account, and you will not be entitled to any refund of any (non-refundable) prepaid amount unless the Trip Provider agrees or allows otherwise under its (pre)payment and cancellation policy.

{'\n'} {'\n'}

If you want to review, adjust, or cancel your Trip Reservation, revert to the confirmation email and follow the instructions therein. Note that you may be charged for your cancellation in accordance with the Trip Provider's cancellation, (pre)payment and no-show policy, or not be entitled to any repayment of any (pre)paid amount. We recommend that you read the cancellation, (pre)payment and no-show policy of the trip provider carefully prior to making your reservation, and remember to make further payments on time as may be required for the relevant reservation.

{'\n'} {'\n'}

If you have a late or delayed arrival on the check-in date or only arrive the next day, make sure to (timely/promptly) communicate this with the Trip Provider so they know when to expect you to avoid cancellation of your Trip (Reservation) or charge of the no-show fee. Our customer service department can help you if needed with informing the Trip Provider. MyBoat does not accept any liability or responsibility for the consequences of your delayed arrival or any cancellation or charged no-show fee by the Trip Provider.

{'\n'} {'\n'}

7. (Further) Correspondence and Communication
{'\n'} {'\n'}
By completing a Trip Reservation, you agree to receive (i) an email/notification which we may send you shortly prior to your arrival date, giving you information on your destination and providing you with certain information and offers (including third-party offers to the extent that you have actively opted in for this information) relevant to your Trip (Reservation) and destination, (ii) an email/notification after arrival to rate the (experience with your) Trip Provider and the Trip Service, and (iii) an email/notification which we may send to you promptly after your trip inviting you to complete our guest review form. See our privacy and cookies policy for more information about how we may contact you.

{'\n'} {'\n'}

MyBoat disclaims any liability or responsibility for any communication by or with the Trip Provider on or through its platform. You cannot derive any rights from any request to, or communication with the Trip Provider or (any form of) acknowledgement of receipt of any communication or request. MyBoat cannot guarantee that any request or communication will be (duly and timely) received/read by, complied with, executed, or accepted by the Trip Provider.

{'\n'} {'\n'}

In order to duly complete and secure your Trip Reservation, you need to use your correct email address. We are not responsible or liable for (and have no obligation to verify) any wrong or misspelled email address, or inaccurate or wrong (mobile) phone number or credit card number.

{'\n'} {'\n'}

Any claim or complaint against MyBoat or in respect to the Trip Service must be promptly submitted, but in any event 10 days after the scheduled day of consummation of the product or service (e.g. check out date). Any claim or complaint that is submitted after the 10 days period may be rejected, and the claimant will forfeit the right to any (damage or cost) compensation.

{'\n'} {'\n'}

Due to the continuous update and adjustments of rates and availability, we strongly suggest to make screenshots when making a reservation to support your position (if needed).

{'\n'} {'\n'}

8. Ranking, Preferred Program, Stars and Guest Reviews
{'\n'} {'\n'}

We aim to display search results that are relevant to you by providing a personalized default ranking of Trip Providers on our Platform. You can scroll through this default ranking, use filters, and sort by alternative ranking orders and thus have the ability to influence the presentation of search results to receive a ranking order based on other criteria. We use multiple algorithms to produce default ranking results, a process that's constantly evolving.

{'\n'} {'\n'}

MyBoat has identified the following parameters to be most closely correlated with you finding a suitable Trip Provider and thus prioritizes these parameters in the algorithms (main parameters): Your personal search history, the rate of "click-through" from the search page to the hotel page ("CTR"), the number of bookings related to the number of visits to the Trip Provider page on the Platform ("Conversion"), gross (including cancellations) and net (excluding cancellations) bookings of a Trip Provider. Conversion and CTR may be affected by various (stand-alone) factors including review scores (both aggregate scores and components), availability, policies, (competitive) pricing, quality of content, and certain features of the Trip Provider. The commission percentage paid by the Trip Provider or other benefits to us (e.g. through commercial arrangements with the Trip Provider or strategic partners) may also impact the default ranking, as well as the Trip Provider’s record of on-time payment. The Trip Provider can also influence its ranking by participating in certain program, which may be updated from time to time, such as the promotion program, deals, the Preferred Partner Program, and the visibility booster (the latter two involve the Trip Provider paying us a higher commission).

{'\n'} {'\n'}

In order to make it easier for customers to find the right match to their travel preferences, MyBoat may assign a quality rating, which is determined by MyBoat and displayed as a yellow tile, to certain boats. In order to determine the comparable set, the quality rating is based on many (400+) features that can be divided over 5 major categories: (i) facilities/amenities/services offered by the trip on MyBoat , (ii) property configuration such as unit size, number of rooms, and occupancy, (iii) number and quality of the photos uploaded by the provider, (iv) average guest review score as well as some subscores (e.g. cleanliness) because those are proven to be particularly helpful for customers in assessing the quality of the trip, and (v) anonymized and aggregated historical booking data (e.g. to assess the star rating of booked trip). We use these multiple features to derive statistical patterns. Based on these inputs, a machine-learning-based analysis is conducted which results in a quality rating (between 1–5, displayed by using 1–5 yellow tiles next to the name of the property) being automatically calculated and awarded to the trip

{'\n'} {'\n'}

Only customers who have done at the trip will be invited by MyBoat to comment on their trip at the relevant trips and to provide a score for certain aspects of their trip or may receive a rating request during their trip. The completed guest review (including submitted rating during your trip) may be (a) uploaded onto the relevant Trip Provider's information page on our Platform for the sole purpose of informing (future) customers of your opinion of the service (level) and quality of the Trip Provider, and (b) (wholly or partly) used and placed by MyBoat at its sole discretion (e.g. for marketing, promotion, or improvement of our services) on our Platform or such social media platforms, newsletters, special promotions, apps, or other channels owned, hosted, used, or controlled by MyBoat and our business partners. In order to offer and maintain recent (and therefore relevant) reviews, reviews can only be submitted within a limited period of time after a trip, and each review will only be available for a limited period of time after posting. The default ranking of the reviews is by date of submission relative to a few additional criteria (such as language, reviews with comments), whereas a review of a customer who [always] submits comprehensive and detailed reviews (aka "Property Scout") may be ranked on top. You have the option to choose various forms of rankings and filters (e.g. by audience, date, language, score). MyBoat might does allow the Trip Provider to respond to a review. We reserve the right to adjust, refuse, or remove reviews at our sole discretion insofar as it violates our review policy. MyBoat does not compensate or otherwise reward customers for completing a review. The guest review form should be regarded as a survey and does not include any (further commercial) offers, invitations, or incentives whatsoever. MyBoat undertakes its best efforts to monitor and remove reviews that include obscenities, mentions of an individual’s name, or references to stolen goods.

{'\n'} {'\n'}

MyBoat will not accept reviews which include:

{'\n'} {'\n'}

Profanity, sexually explicit, hate speech, discriminatory, threats, violence
{'\n'} {'\n'}
Mention of full names, personal attack towards the staff
{'\n'} {'\n'}
Promoting illegal activities (e.g. drugs, prostitution)
{'\n'} {'\n'}
Sites, emails, and addresses, phone numbers, cc details
{'\n'} {'\n'}
Politically sensitive comments
{'\n'} {'\n'}
MyBoat and the Trip Provider are each entitled to terminate their relationship for whatever reason (including in the event of breach of contract or (filing for) bankruptcy) with due observance of the relevant notice period as agreed between both parties.
{'\n'} {'\n'}
changes might apply accourding to MyBoat and also have the rights to do legal actions
{'\n'} {'\n'}


9. Disclaimer
{'\n'} {'\n'}
Subject to the limitations set out in these terms and conditions and to the extent permitted by law, we will only be liable for direct damages actually suffered, paid, or incurred by you due to an attributable shortcoming of our obligations in respect to our services, up to an aggregate amount of the aggregate cost of your reservation as set out in the Trip Reservation confirmation email (whether for one event or series of connected events).

{'\n'} {'\n'}

However and to the extent permitted by law, neither we nor any of our officers, directors, employees, representatives, subsidiaries, distributors, (distribution) partners, licensees, agents, or others involved in creating, sponsoring, promoting, or otherwise making available the site and its contents will be liable for (i) any punitive, special, indirect, or consequential loss or damages, any loss of production, loss of profit, loss of revenue, loss of contract, loss of or damage to goodwill or reputation, loss of claim, (ii) any inaccuracy relating to the (descriptive) information (including rates, availability, and ratings) of the Trip Provider as made available on our Platform, (iii) the services rendered or the products offered by the Trip Provider or other business partners, (iv) any (direct, indirect, consequential, or punitive) damages, losses, or costs suffered, incurred, or paid by you, pursuant to, arising out of or in connection with the use, inability to use, or delay of our Platform, or (v) any (personal) injury, death, property damage, or other (direct, indirect, special, consequential, or punitive) damages, losses, or costs suffered, incurred or paid by you, whether due to (legal) acts, errors, breaches, (gross) negligence, willful misconduct, omissions, non-performance, misrepresentations, tort or strict liability by or (wholly or partly) attributable to the Trip Provider or any of our other business partners (including any of their employees, directors, officers, agents, representatives, subcontractors, or affiliated companies) whose products or service are (directly or indirectly) made available, offered, or promoted on or through the Platform, including any (partial) cancellation, overbooking, strike, force majeure, or any other event beyond our control.

{'\n'} {'\n'}

MyBoat is not responsible (and disclaims any liability) for the use, validity, quality, suitability, fitness, and due disclosure of the Trip and makes no representations, warranties, or conditions of any kind in this respect, whether implied, statutory or otherwise, including any implied warranties of merchantability, title, non-infringement, or fitness for a particular purpose. You acknowledge and agree that the relevant Trip Provider is solely responsible and assumes all responsibility and liability in respect of the Trip (including any warranties and representations made by the Trip Provider). MyBoat is not a (re)seller of the Trip. Complaints or claims in respect of the Trip (including related to the offered (special/promotion) price, policy or specific requests made by Customers) are to be dealt with by the Trip Provider. MyBoat is not responsible for and disclaims any liability in respect of such complaints, claims, and (product) liabilities.

{'\n'} {'\n'}

Whether or not the Trip Provider has charged you for your Trip, or if we are facilitating the payment of the (Trip) price or fee, you agree and acknowledge that the Trip Provider is at all times responsible for the collection, withholding, remittance, and payment of the applicable taxes due on the total amount of the (Trip) price or fee to the relevant tax authorities. MyBoat is not liable or responsible for the remittance, collection, withholding, or payment of the relevant taxes due on the (Trip) price or fee to the relevant tax authorities. MyBoat does not act as the merchant of record for any product or service made available on the Platform.

{'\n'} {'\n'}

By uploading photos/images onto our system (for instance in addition to a review) you certify, warrant and agree that you own the copyright to the photos/images and that you agree that MyBoat may use the uploaded photos/images on its (mobile) website and app, and in (online/offline) promotional materials and publications and as MyBoat at its discretion sees fit. You are granting MyBoat a non-exclusive, worldwide, irrevocable, unconditional, perpetual right and license to use, reproduce, display, have reproduced, distribute, sublicense, communicate and make available the photos/images as MyBoat at its discretion sees fit. By uploading these photos/images the person uploading the picture(s) accepts full legal and moral responsibility of any and all legal claims that are made by any third parties (including, but not limited to, property owners) due to MyBoat publishing and using these photos/images. MyBoat does not own or endorse the photos/images that are uploaded. The truthfulness, validity and right to use of all photos/images is assumed by the person who uploaded the photo, and is not the responsibility of MyBoat MyBoat disclaims all responsibility and liability for the pictures posted. The person who uploaded the photo warrants that the photos/images shall not contain any viruses, Trojan horses or infected files and shall not contain any pornographic, illegal, obscene, insulting, objectionable or inappropriate material and does not infringe any third party (intellectual property right, copyright or privacy) rights. Any photo/image that does not meet the aforesaid criteria will not be posted and/or can be removed/deleted by MyBoat at any time and without prior notice.

{'\n'} {'\n'}

10. Intellectual Property Rights

{'\n'} {'\n'}

Unless stated otherwise, the software required for our services or available at or used by our Platform and the intellectual property rights (including the copyrights) of the contents and information of and material on our Platform are owned by MyBoat its Trip Providers or providers.
{'\n'} {'\n'}


MyBoat exclusively retains ownership of all rights, title and interest in and to (all intellectual property rights of) (the look and feel (including infrastructure) of) the Platform on which the service is made available (including the guest reviews and translated content) and you are not entitled to copy, scrape, (hyper-/deep)link to, publish, promote, market, integrate, utilize, combine or otherwise use the content (including any translations thereof and the guest reviews) or our brand without our express written permission. To the extent that you would (wholly or partly) use or combine our (translated) content (including guest reviews) or would otherwise own any intellectual property rights in the Platform or any (translated) content or guest reviews, you hereby assign, transfer and set over all such intellectual property rights to MyBoat . Any unlawful use or any of the aforementioned actions or behaviour will constitute a material infringement of our intellectual property rights (including copyright and database right).
                      </Text>    
                  }

                    {this.state.about &&

                    // <WebView
                    // originWhitelist={['*']}
                    // source={{ html: html3[0] }}      
                    // />

                    <Text style={{ textAlign: "justify",padding:10,fontSize:15,fontFamily:'Montserrat-Regular'}}> 
                   <Text style={subrata.heading}>About Us {'\n'} {'\n'}</Text>


                    Myboat: The Kuwait App for boat booking
                    {'\n'} {'\n'}
                    MyBoat is an app for tour, fishing, diving and anniversary trips.
                    {'\n'} {'\n'}
                    Want boat trip! Yes we delivered easy direct way for boat booking. customer or boat owner we are happy to present our apps to suit your desire from fishing to island tour to special anniversary that will saved ever in your mind, for boat owners will give the easiest professional app to upload and organize your trips and of course keep you very near to your customer with great communication features
                    </Text>
                    }


                    {this.state.policy &&

                    // <WebView
                    // originWhitelist={['*']}
                    // source={{ html: html1[0] }}      
                    // />

                    // <Text style={{fontSize:16,margin:5,padding:10,textAlign: "justify",fontFamily:'Montserrat-Regular'}} > 
                       <Text style={{ textAlign: "justify",padding:10,fontSize:15,fontFamily:'Montserrat-Regular'}} > 
                      <Text style={subrata.heading}>Privacy Statement {'\n'} {'\n'}</Text>


                      <Text style={{ textAlign: "justify",padding:10,fontSize:15,fontFamily:'Montserrat-Regular'}} > 
{'your privacy is important to us. You place your trust in us by using MyBoat services, and we value that trust. That means we’re committed to protecting and safeguarding any personal data you give us. We act in our customers interest and are transparent about the processing of your personal data.This document describes how we use and process your personal data, provided in a readable and transparent manner. It also tells you what rights you can exercise in relation to your personal data (such as the right to object) and how to contact us. Please also read our Cookie Statement, which tells you how MyBoat uses cookies and other similar technologies'} {'\n'} {'\n'} 
</Text>

<Text style={{ textAlign: "justify",padding:10,fontSize:15,fontFamily:'Montserrat-Regular'}} > 
These pages, the content, and infrastructure of these pages and the online reservation service (including the facilitation of payment service)   provided by us on these pages and through the website are owned, operated, and provided by MyBoat and are provided for your personal, non-commercial (B2C) use only, subject to the terms and conditions set out below. The relationship that we have with the Trip Providers are governed by separate terms and conditions which govern the (B2B) commercial relationship we have with each of these Trip Providers. Each Trip Provider acts in a professional manner. MyBoat when making its product and/or service available on or through MyBoat (both for its business-to-business ("B2B") and/or business-to-consumer ("B2C") relationship). Note that Trip Providers may have, declare applicable, and/or require (acceptance of) – in addition to the policies and fine print as disclosed on the website, their own (delivery/shipping/carriage/usage) terms and conditions and house rules for the use, access, and consummation of the Trip (which may include certain disclaimers and limitations of liability).  {'\n'} {'\n'}
</Text>

<Text>
If you’ve used us before, you know that MyBoat offers online boats-related services through our own websites and mobile apps, as well as other online platforms such as partners’ websites and social media. We’d like to point out that all the info you’re about to read generally applies to not one, not two, but all of these platforms. {'\n'} {'\n'}
   </Text>

   <Text> 
   In fact, this single privacy statement applies to any kind of customer info we collect through all of the above platforms or by any other means connected to these platforms, such as when you contact our customer service team by email. {'\n'} {'\n'}
   </Text>

   <Text> 
   If you're one of our business partners, check out our Privacy Statement for Business Partners to understand how personal data is further processed as part of the business relationship.  {'\n'} {'\n'}
   </Text>

   <Text> 
We might amend the Privacy Statement from time to time, so we recommend revisiting this page occasionally to make sure you know where you stand. If we make changes to the Privacy Statement which will have an impact on you (e.g. if we intend to process your personal data for other purposes than previously communicated), we'll notify you of these changes before the new activities begin.  {'\n'} {'\n'}
   </Text>

   <Text> 
   And now, the sad but necessary part: If you disagree with this Privacy Statement, you should discontinue using our services. If you agree with our Privacy Statement, then you’re all set to book your next trip through us.  {'\n'} {'\n'}
   </Text>

   <Text> 
   Terms we use in this Privacy Statement  {'\n'} {'\n'}
   </Text>

   <Text> 
   “Trip” refers to the various different travel products and services that can be ordered, acquired, purchased, bought, paid, rented, provided, reserved, combined, or consummated by you from the Trip Provider.  {'\n'} {'\n'}
   </Text>

   <Text> 
   “Trip Provide” refers to the provider of transportation provider (e.g. Boat rentals, cruises, boat trips, transfers), trip operators, and any other boat or related product or service as from time to time available for Trip Reservation on the platform.   {'\n'} {'\n'}
   </Text>

   <Text> 
   “Trip Service” refers to the online purchase, order, (facilitated) payment, or reservation service as offered or enabled by MyBoat in regards to various products and services as from time to time made available by Trip Providers on the platform.



“Trip Reservation” refers to the order, purchase, payment, booking, or reservation of a Trip.

   </Text>

   <Text> 
   What kind of personal data does MyBoat collect?
   </Text>

   <Text> 
   We can’t help you book the perfect Trip without information, so when you use our services there are certain things we ask for. This is typically routine info – your name, preferred contact details, the names of the people touring with you, and your payment info. You might also decide to submit additional info related to your upcoming Trip (e.g. your anticipated arrival time).
   </Text>

<Text> 
In addition to this, we also collect info from the computer, phone, tablet, or other device you use to access our services. This includes the IP address, the browser used, and your language settings. There are also situations when we receive info about you from others or automatically collect other info.
{'\n'} {'\n'}
</Text>

<Text> 
This is just a general overview. If you’d like to learn more about the info we collect, we go into more detail below.

{'\n'} {'\n'}
</Text>

<Text> 
Read more about the personal data we collect

{'\n'} {'\n'}
</Text>

<Text> 
Why does MyBoat collect and use your personal data?

{'\n'} {'\n'}
</Text>

<Text> 
The main reason we ask for personal details is to help you organize your online Trip Reservations and ensure you get the best possible service.

{'\n'} {'\n'}
</Text>

<Text> 
We also use your personal data to contact you about the latest deals, special offers, and other products or services we think you might be interested in. There are other uses, too. If you’d like to find out what they are, read on for a more detailed explanation.

{'\n'} {'\n'}
</Text>

<Text> 
Read more about why MyBoat collects your data

{'\n'} {'\n'}
</Text>

<Text> 
How does MyBoat share your data with third parties?

{'\n'} {'\n'}
</Text>

<Text> 
There are different parties integrated into MyBoat services, in various ways and for various reasons. The primary reason we share your data is to provide the Trip Provider with the relevant info to complete your Trip Reservation.

{'\n'} {'\n'}
</Text>

<Text> 
We also involve other parties to provide you MyBoat services. This includes, for example, financial institutions, advertisers, subsidiaries of the MyBoat. In some cases, if we’re required by law, we might share your data with governmental or other authorities.
{'\n'} {'\n'}
</Text>

<Text> 
We’ll go into more detail about how the info you share with us is used and exchanged with these parties below. Read more

{'\n'} {'\n'}
</Text>

<Text> 
Read more about how data is shared with future third parties

{'\n'} {'\n'}
</Text>

<Text> 
How is your personal data shared within the MyBoat ?

{'\n'} {'\n'}
</Text>
<Text> 
MyBoat is part of the MyBoat. Read on to learn how your data may be shared within the MyBoat.

{'\n'} {'\n'}
</Text>

<Text> 
Read more about data within MyBoat

{'\n'} {'\n'}
</Text>

<Text> 
How is your personal data shared and further processed for ground transportation services?

{'\n'} {'\n'}
</Text>

<Text> 
MyBoat — jointly use your data to offer you ground transport services via the MyBoat websites and apps (such as transportation booking). Read more to understand the scope and limited nature of our joint responsibility.

{'\n'} {'\n'}
</Text>

<Text> 
Read more about data and our ground transportation services

{'\n'} {'\n'}
</Text>

<Text> 
How does MyBoat process communications that you and your Trip Provider may send via MyBoat ?

{'\n'} {'\n'}
</Text>


<Text> 
MyBoat can help you and Trip Providers exchange info or requests about services and existing Trip Reservations through the MyBoat platform. To find out more about how MyBoat receives and handles these communications, read on here.

{'\n'} {'\n'}
</Text>

<Text> 
Read more about how these communications are processed

{'\n'} {'\n'}
</Text>

<Text> 
How does MyBoat make use of mobile devices?

{'\n'} {'\n'}
</Text>


<Text> 
We offer free apps that we also collect and process personal data through. This works in a similar way to our website, but they also allow you to benefit from the location services available on your mobile device(s).

{'\n'} {'\n'}
</Text>

<Text> 
Read more about how we use data from mobile devices

{'\n'} {'\n'}
</Text>

<Text> 
How does MyBoat make use of social media?

{'\n'} {'\n'}
</Text>


<Text> 
The use of social media may be integrated into MyBoat services in various ways. These will involve us collecting some of your personal data, or the social media provider receiving some of your info. If you’d like to learn more about how this info is used and exchanged, read on.

{'\n'} {'\n'}
</Text>

<Text> 
Read more about how we use social media data

{'\n'} {'\n'}
</Text>

<Text> 
What security and retention procedures does MyBoat put in place to safeguard your personal data?

{'\n'} {'\n'}
</Text>


<Text> 
We’ve implemented a range of procedures to prevent unauthorized access to and the misuse of personal data that we process.
{'\n'} {'\n'}
</Text>

<Text> 
Read more about security and retention procedures
{'\n'} {'\n'}
</Text>

<Text> 
How can you control the personal data you’ve given to MyBoat ?
{'\n'} {'\n'}
</Text>

<Text> 
You have the right to review the personal data we keep about you at any time. You can request access to or deletion of your personal data by submitting this form. If you want to find out more about your rights to control your personal data, read on.
{'\n'} {'\n'}
</Text>

<Text> 
Read more about how you can control your personal data
{'\n'} {'\n'}
</Text>

<Text> 
Who is responsible for the processing of personal data on the MyBoat website and apps?
{'\n'} {'\n'}
</Text>

<Text> 
MyBoat located in , controls the processing of personal data for the provision of its services. That includes its websites and mobile apps, except for some exceptions that are clarified in this privacy statement.

{'\n'} {'\n'}
</Text>

<Text> 
Read more about MyBoat responsibility for personal data

{'\n'} {'\n'}
</Text>


<Text> 
What kind of personal data does MyBoat collect?
{'\n'} {'\n'}
</Text>

<Text> 
Depending on the law that applies to you, we might be required to provide some additional info. If you'd like to learn more, continue reading.

{'\n'} {'\n'}
</Text>

<Text> 
Personal data you give to us.
{'\n'} {'\n'}
MyBoat collects and uses the info you provide us. When you make a Trip Reservation, you are (at a minimum) asked for your name and email address.
{'\n'} {'\n'}
</Text>

<Text> 
Depending on the Trip Reservation, we might also ask for your home address, phone number, payment info, date of birth, the names of any guests booking with you, and any preferences (e.g. meal preferences, mobility restrictions) you have for your Trip.

{'\n'} {'\n'}
</Text>

<Text> 
If you need to get in touch with our customer service team, contact your Trip Provider through us, or reach out to us in a different way (e.g. social media), we’ll collect info from you there, too if applicable. This applies whether you’re contacting us with feedback or asking for help using our services.

{'\n'} {'\n'}
</Text>

<Text> 
You might also be invited to write reviews to help inform others about the experiences you had on your Trip. When you write a review on the MyBoat platform, we’ll collect any info you’ve included, along with your display name and avatar (if you choose one).

{'\n'} {'\n'}
</Text>

<Text> 
There are other instances where you’ll provide us with info, as well. For example, if you’re browsing with your mobile device, you can decide to allow MyBoat to see your current location or grant us access to your contacts. This helps us give you the best possible service and experience by, for example, showing you our city guides, suggesting attractions close to your location, or making other recommendations.

{'\n'} {'\n'}
</Text>

<Text> 
If you create a user account, we’ll also store your personal settings, uploaded photos, and reviews of previous bookings. This saved data can be used to help you plan and manage future Trip Reservations or benefit from other features only available to account holders, such as incentives or other benefits.

{'\n'} {'\n'}
</Text>

<Text> 
We may offer you referral programs or sweepstakes. Participating in these will involve providing us with relevant personal data.

{'\n'} {'\n'}
</Text>

<Text> 
Personal data you give us about others.
{'\n'} {'\n'}
</Text>

<Text> 
Of course, you might not just be making a Trip Reservation for yourself. You might be taking a Trip with other people or making a reservation on someone else’s behalf. In both scenarios, you’ll provide their details as part of the Trip Reservation.

{'\n'} {'\n'}
</Text>

<Text> 
If you have a MyBoat for Business account, you can also keep an address book to make it easier to plan and manage business trip arrangements for others.

{'\n'} {'\n'}
</Text>

<Text> 
In some cases, you might use MyBoat to share info with others. This can take the form of sharing a wish list or participating in a referral program, as described when you use the relevant feature.

{'\n'} {'\n'}
</Text>

<Text> 
At this point, we have to make it clear that it’s your responsibility to ensure that the person or people you provide personal data about are aware that you’ve done so and that they’ve understood and accepted how MyBoat uses their info (as described in this Privacy Statement).

{'\n'} {'\n'}
</Text>

<Text> 
Personal data we collect automatically.
{'\n'} {'\n'}
Whether or not you end up making a Trip Reservation, when you visit our websites or apps, we automatically collect certain info. This includes your IP address, the date and time you accessed our services, the hardware, software, or internet browser you used, and info about your computer’s operating system like application versions and your language settings. We also collect information about clicks and which pages were shown to you.
{'\n'} {'\n'}
</Text>

<Text> 
If you’re using a mobile device, we collect data that identifies the device, as well as data about your device-specific settings and characteristics, app crashes, and other system activity. When you make a Trip Reservation using this kind of device, our system registers how you made your reservation (on which website), and/or which site you came from when you entered the MyBoat website or app.

{'\n'} {'\n'}
</Text>

<Text> 
Personal data we receive from other sources.
{'\n'} {'\n'}
It’s not just the things you tell us, though – we may also receive info about you from other sources. These include business partners, such as car booking partners, subsidiaries of the MyBoat, and other independent third parties.
{'\n'} {'\n'}
</Text>

<Text> 
Anything we receive from these partners may be combined with info provided by you. For example, MyBoat Trip Reservation services aren’t only made available via MyBoat and the MyBoat apps, but are also integrated into services of trips partners you can find online. When you use any of these services, you provide the reservation details to our business partners who then forward your details to us.

{'\n'} {'\n'}
</Text>

<Text> 
We also integrate with third party service providers to facilitate payments between you and Trip Providers. These service providers share payment information, so we can administer and handle your Trip Reservation, making sure everything goes as smoothly as possible for you.

{'\n'} {'\n'}
</Text>

<Text> 
We also collect info when we receive a complaint about you from a Trip Provider (e.g. in the case of misconduct).

{'\n'} {'\n'}
</Text>

<Text> 
Another way we might receive data about you is through the communication services integrated into our platforms. These communication services offer you a way to contact the Trip Provider you’ve booked with to discuss your trip. In some cases, we receive metadata about these communication activities (e.g. who you are, where you called from, and the date and length of the call).

{'\n'} {'\n'}
</Text>

<Text> 
We may also receive info about you in order to show you more relevant ads, such as the additional cookie data MyBoat social media partners make available to us. Please read the section Why does MyBoat collect and use your personal data? for more info.

{'\n'} {'\n'}
</Text>

<Text> 
When you link your MyBoat user account to a social media account, you might exchange data between MyBoat and that social media provider. You can always choose not to share that data.

{'\n'} {'\n'}
</Text>

<Text> 
Trip Providers may share info about you with MyBoat , too. This could happen if you have support questions about a pending Trip Reservation, or if disputes or other issues arise about a Trip Reservation.

{'\n'} {'\n'}
</Text>

<Text> 
Why does MyBoat collect and use your personal data?
{'\n'} {'\n'}
We use the info collected about you for various purposes. Your personal data may be used in the following ways:
{'\n'} {'\n'}
</Text>

<Text> 
Trip Reservations: First and foremost, we use your personal data to complete and administer your online Trip Reservation, which is essential for what we do. This includes sending you communications that relate to your Trip Reservation, such as confirmations, modifications, and reminders.
{'\n'} {'\n'}
</Text>

<Text> 
Customer service: We provide international customer service from our local offices in 2 languages and are here to help 24/7. Sharing relevant details such as reservation info or info about your user account with our customer service staff allows us to respond when you need us and reached. This includes helping you to contact the right Trip Provider and responding to any questions you might have about your Trip Reservation (or any other questions, for that matter).

{'\n'} {'\n'}
</Text>

<Text> 
Account facilities: MyBoat users can create an account on our website or apps. We use the info you give us to administer this account, enabling you to do a number of useful things. You can manage your Trip Reservations, take advantage of special offers, make future Trip Reservations easily, and manage your personal settings.

{'\n'} {'\n'}
</Text>

<Text> 
Managing personal settings lets you keep and share lists, share photos, view previously searched Trip Services, and check other travel-related info you've provided. You can also see any reviews you’ve written.

{'\n'} {'\n'}
</Text>

<Text> 
If you want, you can share certain info as part of your user account by creating a public profile under your own first name or a screen name you choose.

{'\n'} {'\n'}
</Text>

<Text> 
If you’re a MyBoat for Business account holder, you can also save contact details under that account, manage business reservations, and link other account holders to the same MyBoat for Business account.

{'\n'} {'\n'}
</Text>

<Text> 
Online groups: We might give account holders the chance to connect and interact with each other through online groups or forums.

{'\n'} {'\n'}
Marketing activities: We use your information for marketing activities. These activities include:
{'\n'} {'\n'}
</Text>

<Text> 
Using your contact info to send you regular news about trips-related products and services. You can close notification from setting regarding marketing communications quickly, easily, and anytime. All you need to do is click the “close notification” in setting or other communication.

{'\n'} {'\n'}
</Text>

<Text> 
Based on your info, individualized offers might be shown to you on the MyBoat website, on mobile apps, or on third-party websites/apps (including social media sites), and the content of the site displayed to you might be personalized. These could be offers that you can book directly on the MyBoat website, on co-branded sites, or other third-party offers or products we think you might find interesting.

{'\n'} {'\n'}
</Text>

<Text> 
When you participate in other promotional activities (e.g. sweepstakes, referral programs, or competitions), relevant info will be used to administer these promotions.

{'\n'} {'\n'}

Communicating with you: There might be other times when we get in touch, including by email, mail, phone, or text. Which method we choose depends on the contact info you previously shared.

{'\n'} {'\n'}

We process the communications you send to us. There could be a number of reasons for this, including:

{'\n'} {'\n'}
</Text>

<Text> 
Responding to and handling any requests you or your booked Trip Provider have made. MyBoat also offers customers and Trip Providers various ways to exchange info, requests, and comments about Trip Providers and existing Trip Reservations via MyBoat. For more info, read the section titled “How does MyBoat process communications that you and your booked Trip Provider may send through MyBoat ?.”

{'\n'} {'\n'}
</Text>

<Text> 
If you haven't finalized a Trip Reservation online, we can contact you with a reminder to continue with your reservation. We believe this additional service benefits you because it allows you to carry on with a Trip Reservation without having to search for Trip Providers or enter your reservation details again.

{'\n'} {'\n'}
</Text>

<Text> 
When you use our services, we might send you a questionnaire or invite you to provide a review about your experience with MyBoat or the Trip Provider.

{'\n'} {'\n'}

We also send you other material related to your Trip Reservations, such as how to contact MyBoat if you need assistance while you’re away, and information that we feel might be useful to you in planning or making the most of your Trip. We might also send you material related to upcoming Trip Reservations or a summary of previous Trip Reservations you made through MyBoat .
{'\n'} {'\n'}
Even if you don’t have an upcoming Trip Reservation, we may still need to send you other administrative messages, which could include security alerts.
{'\n'} {'\n'}

</Text>

<Text style={{padding:10}}> 
Market research: We sometimes invite our customers to take part in market research. Review the info that accompanies this kind of invitation to understand what personal data will be collected and how it’s used.

{'\n'} {'\n'}
Improving our services: We also use personal data for analytical purposes and product improvement. This is part of our commitment to improving our services and enhancing the user experience.

{'\n'} {'\n'}
In this case, we use data for testing and troubleshooting purposes, as well as generating statistics about our business. The main goal here is to get insights into how our services perform, how they’re used, and ultimately to optimize and customize our website and apps, making them easier and more meaningful to use. We strive to use pseudonyms for this analytical work as much as possible.

{'\n'} {'\n'}
Customer reviews and other destination-related info: During and after your Trip, we might invite you to submit a review. We can also make it possible for the people you’re traveling with or whom you booked a reservation for to do this instead. This invite asks for info about the Trip Provider or the destination.

{'\n'} {'\n'}
If you have a MyBoat account, you can choose to display a screen name next to your review instead of your real name ,or even submit the review anonymously. If you’d like to set a screen name, you can do so in your account settings. Adding an avatar is also possible.

{'\n'} {'\n'}
By completing a review, you’re agreeing that it can be displayed (as described in detail in our Terms and Conditions) on, for example, the relevant Trip Provider info page on our websites, on our mobile apps, on our social media accounts and social media apps, or on the online platform of the relevant Trip Provider or business partner’s website. This is to inform other travelers about the quality of the Trip Service you used, the destination you have chosen, or any other experiences you choose to share.

{'\n'} {'\n'}
Call monitoring: When you make calls to our customer service team, MyBoat might be uses an automated telephone number detection system to match your telephone number to your existing reservations. This helps save time for both you and our customer service staff. However, our customer service staff may still ask for authentication, which helps to keep your reservation details confidential.

{'\n'} {'\n'}
During calls with our customer service team, live listening might be carried out or calls might be recorded for quality control and training purposes. This includes the use of the recordings for handling of complaints, legal claims, and fraud detection.

{'\n'} {'\n'}
Not all calls are recorded. Recordings are kept for a limited amount of time before being automatically deleted. An exception to this rule is when MyBoat has a legitimate need to keep the recordings longer for fraud investigation or legal purposes.

{'\n'} {'\n'}
Promotion of a safe and trustworthy service: To create a trustworthy environment for you, the people you bring with you on your Trip, MyBoat business partners, and our Trip Providers, we might use personal data to detect and prevent fraud and other illegal or unwanted activities.

{'\n'} {'\n'}
Similarly, we might use personal data for risk assessment and security purposes, including the authentication of users and reservations. When we do this we may have to stop or put certain Trip Reservations on hold until we finish our assessment.

{'\n'} {'\n'}
Legal purposes: Finally, in certain cases, we may need to use your info to handle and resolve legal disputes, for regulatory investigations and compliance to enforce the MyBoat online reservation service terms of use, or to comply with legal requests from law enforcement.

{'\n'} {'\n'}
Providing your personal data to MyBoat is voluntary. However, we may only be able to provide you with certain services if we can only collect some personal data. For example, we can’t process your Trip Reservation if we don’t collect your name and contact details.

{'\n'} {'\n'}
If we use automation to process personal data that produces legal effects or significantly affects you, we’ll always implement the measures required to safeguard your rights and freedoms. This includes the right to obtain human intervention.

{'\n'} {'\n'}
To process your personal data as described above, we rely on the following legal bases:

{'\n'} {'\n'}
As applicable, for purpose A and B, MyBoat relies on the legal basis that the processing of personal data is necessary for the performance of a contract, specifically to finalize and administer your Trip Reservation.

{'\n'} {'\n'}
If the required personal data isn’t provided, MyBoat can’t finalize the Trip Reservation, nor can we provide customer service. In view of purposes C to L, MyBoat relies on its legitimate commercial business interest to provide its services, prevent fraud, and improve our services (as set out more specifically under C to L).

{'\n'} {'\n'}
When using personal data to serve MyBoat or a third party's legitimate interest, MyBoat will always balance your rights and interests in the protection of your personal data against MyBoat rights and interests or those of the third party. For purpose M, MyBoat also relies, where applicable, on compliance with legal obligations (such as legal law enforcement requests).

{'\n'} {'\n'}
Finally, when required under law, MyBoat will obtain your consent prior to processing your personal data, including for email marketing purposes or as otherwise required by law.

{'\n'} {'\n'}
If you wish to object to the processing set out under C to L and no opt-out mechanism is available to you directly (for example, in your account settings), contact us at

{'\n'} {'\n'}
myboat667@gmail.com
{'\n'} {'\n'}
How does MyBoat share your data with third parties?

{'\n'} {'\n'}
In certain circumstances, we’ll share your personal data with third parties. These third parties include:

{'\n'} {'\n'}
The Trip Provider You Booked: In order to complete your Trip Reservation, we transfer relevant reservation details to the Trip Provider you've booked. This is one of the most essential things we do for you.

{'\n'} {'\n'}
Depending on the Trip Reservation and Trip Provider, the details we share can include your name, contact and payment details, the names of the people accompanying you, and any other info or preferences you specified when you made your Trip Reservation.


{'\n'} {'\n'}
In certain cases, we also provide some additional historical info about you to the Trip Provider. This includes whether you’ve already booked with them in the past, the number of completed bookings you’ve made with MyBoat , a confirmation that no misconduct has been reported about you, the percentage of bookings you’ve canceled in the past, or whether you’ve given reviews about past bookings.

{'\n'} {'\n'}
If you have a question about your Trip, we may contact the Trip Provider to handle your request. Unless payment is made during the booking process through the MyBoat website, we’ll forward your credit card details to the booked Trip Provider for handling (assuming you provide us those details).

{'\n'} {'\n'}
In cases of Trip Reservation-related disputes, we may provide the Trip Provider with your contact details, including your email address and info about the Trip Reservation process needed to handle the dispute. This may include a copy of your reservation confirmation as proof that a Trip Reservation was actually made.

{'\n'} {'\n'}
Sometimes, at the direction of the Trip Provider, we’ll need to share your personal data with parties related to the Trip Provider to finalize and administer your reservation. These parties might include other entities of a trip group or service providers who are handling the data on the Trip Provider’s behalf.

{'\n'} {'\n'}
Your local MyBoat office: To support the use of MyBoat services, your details may be shared with subsidiaries of the MyBoat, including for customer service. To find out more about the MyBoat, visit send us email at myboat667@gmail.com.

{'\n'} {'\n'}
Third-party service providers: We use service providers outside of the MyBoat to support us in providing our services. These include:

{'\n'} {'\n'}
Customer support

{'\n'} {'\n'}
Market research

{'\n'} {'\n'}
Fraud detection and prevention (including anti-fraud screening)

{'\n'} {'\n'}
Payment
{'\n'} {'\n'}
We use third parties to process payments, handle chargebacks or provide billing collection services. When a chargeback is requested for your Trip Reservation, either by you or the holder of the credit card used to make the reservation, we’ll need to share certain reservation details with the payment service provider and the relevant financial institution so they can handle the chargeback. This could also include a copy of your reservation confirmation or the IP address used to make your reservation. We might share information with relevant financial institutions if we consider it strictly necessary for fraud detection and prevention purposes.

{'\n'} {'\n'}
Marketing services

{'\n'} {'\n'}
We share personal data with advertising partners, including your email address, as part of marketing MyBoat services via third parties to ensure that relevant ads are shown to the right audience. We use techniques like hashing to enable the matching of your email address with an existing customer database so that your email address can’t be used for other purposes. For info about other personalized ads and your choices, read our Cookie Statement.

{'\n'} {'\n'}
Advertising partners
{'\n'} {'\n'}
All service providers are required to continue to safeguard your personal data adequately.

{'\n'} {'\n'}
Competent Authorities: We disclose personal data to law enforcement to the extent required by law or strictly necessary for the prevention, detection, or prosecution of criminal acts and fraud, or if we’re legally obliged to do so otherwise. We may need to further disclose personal data to competent authorities to protect and defend our rights or properties, or the rights and properties of our business partners.

{'\n'} {'\n'}
Business partners: We work with many business partners around the world. These business partners distribute or advertise the MyBoat services, including the services and products of our Trip Providers.

{'\n'} {'\n'}
When you make a reservation on one of our business partners’ websites or apps, certain personal data that you give them, such as your name and email address, address, payment details, and other relevant info will be forwarded to us to finalize and manage your Trip Reservation.

{'\n'} {'\n'}
If customer service is provided by the business partner, MyBoat will share relevant reservation details with them (as and when needed) to provide you with appropriate and efficient support.

{'\n'} {'\n'}
When you make a reservation through one of our business partners’ websites, the business partners can receive certain parts of your personal data related to the specific reservation and your interactions on these partner websites. This is for their commercial purposes.

{'\n'} {'\n'}
When you make a reservation on a business partner’s website, take the time to read their privacy notice if you’d like to understand how they process your personal data.

{'\n'} {'\n'}
For fraud detection and prevention purposes, we may also exchange info about our users with business partners, but only when strictly necessary

{'\n'} {'\n'}
Partner Offer: We may enable you to book using Partner Offer, which means your reservation is facilitated by a Trip Provider separate from the booked trip. As part of the reservation process, we’ll need to share some relevant personal data with this Trip Provider.

{'\n'} {'\n'}
If Partner Offer is used, review the info provided in the booking process or check your reservation confirmation for more info about the Trip Provider and how your personal data is further processed by them.

{'\n'} {'\n'}
The MyBoat: Read about how we share your personal data with the MyBoat.

{'\n'} {'\n'}
How is your personal data shared within the MyBoat ?

{'\n'} {'\n'}
MyBoat . More info is available at MyBoat667@gmail.com

{'\n'} {'\n'}
We may receive personal data about you from other companies in the MyBoat or share your personal data with them for the following purposes:

{'\n'} {'\n'}
To provide services (including to make, administer, and manage reservations or handle payments)

{'\n'} {'\n'}
To provide customer service

{'\n'} {'\n'}
To detect, prevent, and investigate fraudulence or other illegal activities and data breaches

{'\n'} {'\n'}
For analytical and product improvement purposes

{'\n'} {'\n'}
To send you personalized offers or marketing with your consent, or as otherwise permitted by applicable law

{'\n'} {'\n'}
For hosting, technical support, overall maintenance, and maintaining security of such shared data

{'\n'} {'\n'}
To ensure compliance with applicable laws

{'\n'} {'\n'}
As applicable and unless indicated otherwise, for purposes A to F, MyBoat relies on its legitimate interest to share and receive personal data. For purpose G, MyBoat relies, where applicable, on compliance with legal obligations (such as legal law enforcement requests).

{'\n'} {'\n'}
 MyBoat  may need to exchange personal customer data to ensure all users are protected from fraudulent activities on its online platforms.

{'\n'} {'\n'}
How does MyBoat process communications that you and your booked Trip Provider may send via MyBoat ?

{'\n'} {'\n'}
MyBoat can offer you and Trip Providers various ways to communicate about the Trip Services and existing Trip Reservations by directing communications via MyBoat . This also allows you and your Trip Provider to contact MyBoat with questions about your Trip Reservation through the website, our apps, and the other channels that we provide.

{'\n'} {'\n'}
MyBoat accesses communications and may use automated systems to review, scan, and analyze communications for the following reasons:

{'\n'} {'\n'}


Security purposes

{'\n'} {'\n'}


Fraud prevention

{'\n'} {'\n'}


Compliance with legal and regulatory requirements

{'\n'} {'\n'}


Investigations of potential misconduct

{'\n'} {'\n'}


Product development and improvement

{'\n'} {'\n'}


Research

{'\n'} {'\n'}


Customer engagement (including to provide you info and offers that we believe might interest you)

{'\n'} {'\n'}


Customer or technical support

{'\n'} {'\n'}


We reserve the right to review or block the delivery of communications that we, at our sole discretion, believe might contain malicious content or spam, or pose a risk to you, Trip Providers, MyBoat , or others.

{'\n'} {'\n'}


All communications sent or received using MyBoat communication tools will be received and stored by MyBoat. Business partners (through whose platforms you make a reservation) and Trip Providers might also choose to communicate with you directly by email or other channels that MyBoat doesn’t control.

{'\n'} {'\n'}


How does MyBoat make use of mobile devices?

{'\n'} {'\n'}


We offer free apps for a range of different mobile devices, as well as versions of our regular website that are optimized for browsing on a phone and tablet.

{'\n'} {'\n'}


These apps and mobile websites process the personal details you give us in a similar way that our website does. They also allow you to use location services to find Trip Services nearby, if you want.

{'\n'} {'\n'}


With your consent, we may send you push notifications with information about your Trip Reservation. You can also grant us access to your location data or contact details in order to provide services you request. If you upload pictures to our platform, these pictures may include location info (known as metadata) as well. Read your mobile device’s instructions to understand how to change your settings and control the sharing of this type of data.

{'\n'} {'\n'}


In order to optimize our services and marketing activities, and to make sure we give you a consistent user experience, we use something known as “cross-device tracking.” This can be done with or without the use of cookies. For more general info about cookies and other similar technologies, see our Cookie statement.

{'\n'} {'\n'}


With cross-device tracking, MyBoat is able to track user behavior across multiple devices. As part of cross-device tracking, we may combine data collected from a particular browser or mobile device with data from another computer or device that’s linked to it.

{'\n'} {'\n'}


To optimize the content of the MyBoat newsletter, we combine searches and reservations made from different computers and devices. You can unsubscribe from the MyBoat newsletter anytime.

{'\n'} {'\n'}


Personalized ads shown to you on other websites or in apps, can be offered based on your activities on linked computers and devices. By changing the cookie settings on your device (see our Cookie statement under “What are your choices?”), you can change your cross-device tracking settings for advertisement purposes. You should know that logging out of your MyBoat account doesn’t mean that you will no longer receive personalized ads.

{'\n'} {'\n'}


How does MyBoat make use of social media?

{'\n'} {'\n'}

At MyBoat , we use social media in different ways. We use it to facilitate the use of online reservation services, to promote our Trip Providers’ trips-related products and services, and to advertise, improve, and facilitate our own services.

{'\n'} {'\n'}


The use of social media features can result in the exchange of personal data between MyBoat and the social media service provider, as described below. You’re free to not use any of the social media features available to you.

{'\n'} {'\n'}


Sign in with your social media account. We offer you the opportunity to sign in to a MyBoat user account with one of your social media accounts. We do this to reduce the need for you to remember different usernames and passwords for different online services.

{'\n'} {'\n'}


After signing in once, you’ll always be able to use your social media account to sign in to your MyBoat account. You can decouple your MyBoat user account from your chosen social media account anytime you want.

{'\n'} {'\n'}


Integration of social media plugins: We’ve also integrated social media plugins into MyBoat website and apps. This means that when you click one of the buttons (e.g. Facebook’s “Like” button), certain info is shared with these social media providers.

{'\n'} {'\n'}


If you’re logged-in to your social media account at the same time, your social media provider may relate this info to your social media account. Depending on your settings, they might also display these actions on your social media profile to others in your network.

{'\n'} {'\n'}


Other social media services and features. We may integrate other social media services (e.g. social media messaging) for you to interact with MyBoat or your contacts about our services.

{'\n'} {'\n'}


We may maintain social media accounts and offer apps on several social media sites. Whenever you connect with MyBoat through social media, your social media service provider may allow you to share info with us.

{'\n'} {'\n'}


If you choose to share, you will generally be told by your social media provider which information will be shared. For example, when you sign in to a MyBoat user account using your social media account, certain info may be shared with MyBoat , including your email address, age, or profile pictures saved to your social media account, depending on what you authorize.

{'\n'} {'\n'}


When you register with a MyBoat social media app or connect to a social media messaging service without a MyBoat user account, the info you choose to share with us may include the basic info available in your social media profile, including your email, status updates, and a list of your contacts.

{'\n'} {'\n'}


We’ll use this info to help provide you with the service you requested, for example, to forward a message you want to send to your contacts or to create a personalized user experience on the app or our websites. It means that—if you want us to—we can customize our services to fit your needs, connecting you and your friends to the best trips destinations, as well as analyzing and enhancing our trips-related services.

{'\n'} {'\n'}


Your social media provider will be able to tell you more about how they use and process your data when you connect to MyBoat through them. This can include combining the personal data they collect when you use MyBoat through them with info they collect when you use other online platforms also linked to your social media account.

{'\n'} {'\n'}


If you decide to connect using your Facebook or Google account, review the following links for info about how these parties use data they receive: Facebook and Google.

{'\n'} {'\n'}


What security and retention procedures does MyBoat put in place to safeguard your personal data?

{'\n'} {'\n'}


We observe reasonable procedures to prevent unauthorized access to and the misuse of personal data.

{'\n'} {'\n'}


We use appropriate business systems and procedures to protect and safeguard the personal data you give us. We also use security procedures and technical and physical restrictions for accessing and using the personal data on our servers. Only authorized personnel are allowed to access personal data in the course of their work.

{'\n'} {'\n'}


We’ll keep your personal data for as long as we think necessary to enable you to use our services or to provide our services to you (including maintaining your MyBoat user account, if you have one), to comply with applicable laws, to resolve any disputes, and to otherwise allow us to conduct our business, including to detect and prevent fraud or other illegal activities. All personal data we keep about you is covered by this Privacy Statement.

{'\n'} {'\n'}


For added protection, we strongly recommend setting up two-factor authentication for your MyBoat account. This adds an extra authentication step to make sure anyone who gets ahold of your username and password (e.g. through phishing or social engineering) won’t be able to access your account. You can set this up in the Security section of your account settings.

{'\n'} {'\n'}


How does MyBoat treat personal data belonging to children?

{'\n'} {'\n'}


Our services aren’t intended for children under 16, and we’ll never collect their data unless it’s provided by (and with the consent of) a parent or guardian. The limited cases we might need to collect data for include as part of a reservation, the purchase of other trips-related services, or in other exceptional circumstances, such as features addressed to families. Again, this will only be used and collected as provided by a parent or guardian and with their consent.

{'\n'} {'\n'}


If we find out that we processed info of a child under 16 without the valid consent of a parent or guardian, we reserve the right to delete it. moreover the boats owner will be handling the age or country law for reservation and booking

{'\n'} {'\n'}


How can you control the personal data you’ve given to MyBoat ?

{'\n'} {'\n'}


We want you to be in control of how your personal data is used by us. You can do this in the following ways:

{'\n'} {'\n'}


You can ask us for a copy of the personal data we hold about you.

{'\n'} {'\n'}


You can inform us of any changes to your personal data or ask us to correct any of the personal data we hold about you. As explained below, you can make some of these changes yourself when you have a user account.

{'\n'} {'\n'}


In certain situations, you can ask us to erase, block, or restrict the processing of the personal data we hold about you, or object to particular ways that we use your personal data.

{'\n'} {'\n'}


In certain situations, you can also ask us to send the personal data you've given us to a third party.

{'\n'} {'\n'}


Where we use your personal data on the basis of your consent, you’re entitled to withdraw that consent at any time, subject to applicable law.

{'\n'} {'\n'}


Where we process your personal data based on legitimate interest or the public interest, you have the right to object to that use of your personal data at any time, subject to applicable law.

{'\n'} {'\n'}


We rely on you to make sure that your personal info is complete, accurate, and current. Let us know about any changes to or inaccuracies in your personal info as soon as possible.

{'\n'} {'\n'}

If you have a MyBoat user account, you can access a lot of your personal data through our website or apps. You’ll generally find the option to add, update, or remove info we have about you in your account settings.

{'\n'} {'\n'}

If any of the personal data we have about you isn’t accessible through our website or apps, you can send us a request, which won’t cost you anything.

{'\n'} {'\n'}

If you want to exercise your right of access or erasure, all you need to do is complete and submit the Data Subject Request for MyBoat Customers form. For any requests relating to this Privacy Statement, to exercise any of your other rights, or if you have a complaint, contact our Data Protection Officer at myboat667@gmail.com. You can also contact your local data protection authority.

{'\n'} {'\n'}

If you want to object to your personal data being processed on the basis of legitimate interest and there’s no option to opt out directly, contact us at myboat667@gmail.com

{'\n'} {'\n'}

Who is responsible for the processing of personal data via MyBoat and how to contact us?
{'\n'} {'\n'}
myboat controls the processing of personal data as described in this Privacy Statement, except where explicitly stated otherwise.
{'\n'} {'\n'}
If you have any questions about this Privacy Statement or our processing of your personal data, contact our Data Protection Officer at myboat667@gmail.com and we’ll get back to you as soon as possible.

{'\n'} {'\n'}

For questions about a reservation, contact our customer service team through the customer service contact page.

{'\n'} {'\n'}

Requests from law enforcement should be submitted using the Law Enforcement process.

{'\n'} {'\n'}

Cookie statement
{'\n'} {'\n'}
Whenever you use our online services or apps, we use cookies and other online tracking technologies (which we’ll also refer to as “cookies” for the purpose of this Cookie Statement).

{'\n'} {'\n'}

Cookies can be used in various ways, including to make the MyBoat website work, analyze traffic, or for advertising purposes.

{'\n'} {'\n'}

Read below to learn more about what a “cookie” is, how they’re used, and what your choices are.

{'\n'} {'\n'}

What are cookies and other online tracking technologies?

{'\n'} {'\n'}

How are cookies used?

{'\n'} {'\n'}

What are your choices?

{'\n'} {'\n'}

What are cookies and online tracking technologies?

{'\n'} {'\n'}

A web browser cookie is a small text file that websites place on your computer’s or mobile device’s web browser.

{'\n'} {'\n'}

These cookies store info about the content you view and interact with to remember your preferences and settings or analyze how you use online services.

{'\n'} {'\n'}

Cookies are divided into “first party” and “third party”:

{'\n'} {'\n'}

First party cookies are the cookies served by the owner of the domain. In our case, that’s MyBoat . Any cookie we place ourselves is a “first-party cookie.”

{'\n'} {'\n'}

Third-party cookies are cookies placed on our domains by trusted partners that we’ve allowed to do so. These can be social media partners, advertising partners, security providers, and more.

{'\n'} {'\n'}

And they can be either “session cookies” or “permanent cookies”:

{'\n'} {'\n'}

Session cookies only exist until you close your browser, ending what’s called your “session.” Then they’re deleted.

{'\n'} {'\n'}

Permanent cookies have a range of lifespans and stay on your device after the browser is closed. On the MyBoat platform, we try to only serve permanent cookies (or allow permanent cookies to be served by third parties) that have a limited lifespan. However, for security reasons or in other exceptional circumstances, sometimes we may need to give a cookie a longer lifespan.

{'\n'} {'\n'}

Web browser cookies may store info such as your IP address or other identifiers, your browser type, and info about the content you view and interact with on digital services. By storing this info, web browser cookies can remember your preferences and settings for online services and analyze how you use them.

{'\n'} {'\n'}

Along with cookies, we also use tracking technologies that are very similar. Our website, emails, and mobile apps may contain small transparent image files or lines of code that record how you interact with them. These include “web beacons,” “scripts,” “tracking URLs,” or “software development kits” (known as SDKs):

{'\n'} {'\n'}

Web beacons have a lot of different names. They might also be known as web bugs, tracking bugs, tags, web tags, page tags, tracking pixels, pixel tags, 1x1 GIFs, or clear GIFs.

{'\n'} {'\n'}

In short, these beacons are a tiny graphic image of just one pixel that can be delivered to your device as part of a web page request, in an app, an advertisement, or an HTML email message.

{'\n'} {'\n'}

They can be used to retrieve info from your device, such as your device type, operating system, IP address, and the time of your visit. They are also used to serve and read cookies in your browser or to trigger the placement of a cookie.

{'\n'} {'\n'}

Scripts are small computer programs embedded within our web pages that give those pages a wide variety of extra functionality. Scripts make it possible for the website to function properly. For example, scripts power certain security features and enable basic interactive features on our website.

{'\n'} {'\n'}

Scripts can also be used for analytical or advertising purposes. For example, a script can collect info about how you use our website, such as which pages you visit or what you search for.

{'\n'} {'\n'}

Tracking URLs are links with a unique identifier in them. These are used to track which website brought you to the MyBoat website or app you’re using. An example would be if you clicked from a social media page, search engine, or one of our affiliate partners’ websites.

{'\n'} {'\n'}

Software Development Kits (SDKs) are part of our apps’ source code. Unlike browser cookies, SDK data is stored in the app storage.

{'\n'} {'\n'}

They’re used to analyze how the apps are being used or to send personalized push notifications. To do this, they record unique identifiers associated with your device, like your device ID, IP address, in-app activity, and network location.

{'\n'} {'\n'}

All these tracking technologies are referred to as “cookies” here in this Cookie Statement.

{'\n'} {'\n'}

How are cookies used?

{'\n'} {'\n'}

Cookies are used to collect info, including:

{'\n'} {'\n'}

IP address

{'\n'} {'\n'}

Device ID

{'\n'} {'\n'}

Viewed pages

{'\n'} {'\n'}

Browser type

{'\n'} {'\n'}

Browsing info

{'\n'} {'\n'}

Operating system

{'\n'} {'\n'}

Internet service provider

{'\n'} {'\n'}

Timestamp

{'\n'} {'\n'}

Whether you have responded to an advertisement

{'\n'} {'\n'}

A referral URL

{'\n'} {'\n'}

Features used or activities engaged in on the website/apps

{'\n'} {'\n'}

They allow you to be recognized as the same user across the pages of a website, devices, between websites, or when you use our apps. When it comes to purpose, they’re divided into three categories: Functional cookies, analytical cookies, and marketing cookies.

{'\n'} {'\n'}

Functional cookies

{'\n'} {'\n'}

These are cookies required for our websites and apps to function and must be enabled for you to use our services.

{'\n'} {'\n'}

Functional cookies are used to create technologically advanced, user-friendly websites and apps that adapt automatically to your needs and preferences, so you can browse and book easily. This also includes enabling essential security and accessibility features.

{'\n'} {'\n'}

More specifically, these cookies:

{'\n'} {'\n'}

Enable our website and apps to work properly, so you can create an account, sign in, and manage your bookings.

{'\n'} {'\n'}

Remember your selected currency and language settings, past searches, and other preferences to help you use our website and apps efficiently and effectively.

{'\n'} {'\n'}

Remember your registration info so you don’t have to retype your log-in credentials each time you visit our website or app. (Don’t worry, passwords are always encrypted.)

{'\n'} {'\n'}

Analytical cookies

{'\n'} {'\n'}

These cookies measure and track how our website and apps are used. We use this info to improve our website, apps, and services.

{'\n'} {'\n'}

More specifically, these cookies:

{'\n'} {'\n'}

Help us understand how visitors and customers like you use MyBoat and our apps.

{'\n'} {'\n'}

Help improve our website, apps, and communications to make sure we're interesting and relevant.

{'\n'} {'\n'}

Allow us to find out what does and doesn't work on our website and apps.

{'\n'} {'\n'}

Help us understand the effectiveness of advertisements and communications.

{'\n'} {'\n'}

Teach us how users interact with our website or apps after they’re shown an online ad, including ads on third-party websites.

{'\n'} {'\n'}

Enable our business partners to learn whether or not their customers make use of any trip offers integrated into their websites.

{'\n'} {'\n'}

The data we gather through these cookies can include which web pages you’ve viewed, which referral/exit pages you’ve entered and left from, which platform type you’ve used, which emails you’ve opened and acted upon, and date and timestamp info. It also means we can use details about how you’ve interacted with the site or app, such as the number of clicks you make on a given screen, your mouse and scrolling activity, the search words you use, and the text you enter into various fields.

{'\n'} {'\n'}

Marketing cookies
{'\n'} {'\n'}
These cookies are used by MyBoat and our trusted partners to gather info about you over time, across multiple websites, applications, or other platforms.

{'\n'} {'\n'}

Marketing cookies help us to decide which products, services, and interest-based ads to show you, both on and off our website and apps.

{'\n'} {'\n'}

More specifically, these cookies:

{'\n'} {'\n'}

Categorize you into a certain interest profile, for example, based on the websites you visit and your click behavior. We use these profiles to display personalized content (e.g. travel ideas or specific trips) on MyBoat and other websites.

{'\n'} {'\n'}

Display personalized and interest-based ads both on the MyBoat website, our apps, and other websites. This is called “retargeting” and is based on your browsing activities, such as the destinations you’ve searched for, the trips you’ve viewed, and the prices you’ve been shown. It can also be based on your shopping habits or other online activities.

{'\n'} {'\n'}

Retargeting ads can be shown to you both before and after you leave MyBoat since their aim is to encourage you to browse or return to our website. You might see these ads on websites, apps, or in emails.

{'\n'} {'\n'}

Integrate social media into our website and apps. This allows you to like or share content or products on social media such as Facebook, Instagram, YouTube, Twitter, Pinterest, Snapchat, and LinkedIn.

{'\n'} {'\n'}

These “like” and “share” buttons work using pieces of code from the individual social media providers, allowing third-party cookies to be placed on your device.

{'\n'} {'\n'}

These cookies can be purely functional, but can also be used to keep track of which websites you visit from their network, to build a profile of your online browsing behavior, and to show you personalized ads. This profile will be partly built using comparable info the providers receive from your visits to other websites in their network.

{'\n'} {'\n'}

To read more about what social media providers do with your personal data, take a look at their cookie and/or privacy statements: Facebook (includes Instagram, Messenger, and Audience Network), Snapchat, Pinterest, and Twitter. Be aware that these statements may be updated from time to time.

{'\n'} {'\n'}

We work with trusted third parties to collect data. We may occasionally share info with these third parties, such as your email address or phone number. These third parties might link your data to other info they collect to create custom audiences or deliver targeted ads. For info about how these third parties process your data, take a look at the following links: How Google uses information, Facebook's data policy.

{'\n'} {'\n'}

Non-cookie techniques – email pixels

{'\n'} {'\n'}

We may also use techniques like pixels, which we don’t mark as cookies because they don’t store any info on your device.

{'\n'} {'\n'}

We sometimes place pixels in emails like newsletters. A “pixel” is an electronic file the size of a single pixel that’s placed in the email and loaded when you open it. By using email pixels, we can see if the message was delivered, if and when you read it, and what you click.

{'\n'} {'\n'}

We also receive this info about the push notifications we send you. These statistics provide us with feedback about your reading behavior, which we use to optimize our messages, and make our communications more relevant to you.

{'\n'} {'\n'}

What are your choices?

{'\n'} {'\n'}

To learn more about cookies and how to manage or delete them, visit allaboutcookies.org or the help section of your browser.

{'\n'} {'\n'}

Under the settings for browsers like Internet Explorer, Safari, Firefox, or Chrome, you can choose which cookies to accept and reject. Where you find these settings depends on the browser you use:

{'\n'} {'\n'}

Cookie settings in Chrome

{'\n'} {'\n'}

Cookie settings in Firefox

{'\n'} {'\n'}

Cookie settings in Internet Explorer

{'\n'} {'\n'}

Cookie settings in Safari

{'\n'} {'\n'}

If you choose to block certain functional cookies, you may not be able to use some features of our services.

{'\n'} {'\n'}

In addition to specific settings that we may offer on the MyBoat and apps, you can also opt out of certain cookies:

{'\n'} {'\n'}

Analytics

{'\n'} {'\n'}

To prevent Google Analytics from collecting analytical data on certain browser types visit the following link: Google Analytics Opt-out Browser Add-on (only available on desktop).

{'\n'} {'\n'}

Advertising

{'\n'} {'\n'}

We always aim to work with advertising and marketing companies that are members of the Network Advertising Initiative (NAI) and/or the Interactive Advertising Bureau (IAB).

{'\n'} {'\n'}

Members of the NAI and IAB adhere to industry standards and codes of conduct, and allow you to opt out of behavioral advertising.

{'\n'} {'\n'}

Visit www.networkadvertising.org to identify NAI members that may have placed advertising cookies on your computer. To opt out of any NAI member's behavioral advertising program, just check the box that corresponds to that company.

{'\n'} {'\n'}

You may also want to visit www.youronlinechoices.com or www.youradchoices.com to learn how to opt out of customized ads.

{'\n'} {'\n'}

Your mobile device may allow you to limit the sharing of info for retargeting purposes through its settings. If you choose to do so, remember that opting out of an online advertising network doesn't mean you’ll no longer see or be subject to online advertising or marketing analysis. It just means the network you opted out of won't deliver ads customized to your web preferences and browsing patterns anymore.

{'\n'} {'\n'}

Some websites have “Do Not Track” features that allow you to tell a website not to track you. We’re currently unable to support “Do Not Track” browser settings.

{'\n'} {'\n'}

How to contact us
{'\n'} {'\n'}

If you have any questions about this cookie statement, write us at myboat667@gmail.com

{'\n'} {'\n'}

Our cookie statement may also be updated from time to time. If these updates are substantial, particularly relevant to you, or impact your data protection rights, we’ll get in touch with you about them. However, we recommend visiting this page regularly to stay up to date with any other (less substantial or relevant) updates.
</Text>



                    </Text>
                    }
 
            </View>
            </ScrollView>
        </View>
    )
}
}
const subrata=StyleSheet.create({
    SEC2:{
        backgroundColor:Colors.white,
        borderTopLeftRadius:25,
        borderTopEndRadius:25,
        marginTop:-40,
        flex:1
    },
   heading:{
     fontSize:18,
     fontWeight:'bold'
   }

})
