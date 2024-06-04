//https://csvjson.com/csv2json -> convertidor de csv a json

data = [...{}]
  
  let coupons = [];
  const acl = new Parse.ACL();
  acl.setPublicReadAccess(true);
  const company = await new Parse.Query("Company").equalTo("name", "Unireformada").first();
  data.forEach((_coupon) => {
    let coupon = new Parse.Object("Coupon");
    coupon.setACL(acl);
    coupon.set("title", _coupon.title);
    coupon.set("company", company);
    coupon.set("originalPrice", _coupon.originalPrice);
    coupon.set("discount", _coupon.discount);
    coupon.set("description", _coupon.description);
    coupon.set("rules", _coupon.rules.split(";"));
    coupon.set("expiration", new Date(Date.parse(_coupon.expiration)));
    coupon.set("style", _coupon.style);
    coupon.set("border", _coupon.border);
    coupon.set("price", _coupon.price);
    coupon.set("color", _coupon.color);
    coupon.set("left", 0);
    coupon.set("haveAmount", false);
    coupons.push(coupon)
  })
  
  Parse.Object.saveAll(coupons)