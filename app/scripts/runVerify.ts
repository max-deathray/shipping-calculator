import { verify } from "./verifyRateIncrease";

// Standard
import { standardRatesByZone as standardOld } from "../data/shippingRates/standardShippingRates";
import { standardRatesByZone as standardNew } from "../data/shippingRates/standardShippingRates_7";

// Two Day
import { twoDayRatesByZone as twoDayOld } from "../data/shippingRates/twoDayRates";
import { twoDayRatesByZone as twoDayNew } from "../data/shippingRates/twoDayRates_7";

// Express Saver (your file is named expressSaveRates.ts)
import { expressSaverRatesByZone as expressOld } from "../data/shippingRates/expressSaveRates";
import { expressSaverRatesByZone as expressNew } from "../data/shippingRates/expressSaveRates_7";

// Overnight
import { overnightRatesByZone as overnightOld } from "../data/shippingRates/overnightRates";
import { overnightRatesByZone as overnightNew } from "../data/shippingRates/overnightRates_7";

verify("Standard", standardOld, standardNew);
verify("Two Day", twoDayOld, twoDayNew);
verify("Express Saver", expressOld, expressNew);
verify("Overnight", overnightOld, overnightNew);
