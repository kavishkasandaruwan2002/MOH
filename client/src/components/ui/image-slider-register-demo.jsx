import * as React from "react";
import { motion } from "framer-motion";
import { ImageSlider } from "@/components/ui/image-slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Cross, UserPlus, AlertCircle, Loader2 } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function ImageSliderRegisterDemo() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = React.useState('');
  const [nic, setNic] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [division, setDivision] = React.useState('Colombo Central');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const images = [
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=900&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=900&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&auto=format&fit=crop&q=80",
  ];

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const payload = {
      name,
      nic,
      email,
      password: password || 'password123',
      phone: phone || '+94 77 123 4567',
      division: division || 'Colombo Central',
      role: 'CITIZEN'
    };

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (res.ok && data.user) {
        login(data.user, data.token || 'demo-jwt-token');
        navigate('/dashboard/citizen');
      } else {
        setError(data.message || 'Registration failed. Creating demo session.');
        const mockUser = {
          id: 'usr-' + Date.now(),
          name: name || 'Sunethra Ranasinghe',
          email: email || 'citizen@example.com',
          nic: nic || '199056781234',
          phone: phone || '+94 77 999 8877',
          division,
          role: 'CITIZEN'
        };
        login(mockUser, 'demo-jwt-token');
        navigate('/dashboard/citizen');
      }
    } catch (err) {
      const mockUser = {
        id: 'usr-' + Date.now(),
        name: name || 'Sunethra Ranasinghe',
        email: email || 'citizen@example.com',
        nic: nic || '199056781234',
        phone: phone || '+94 77 999 8877',
        division,
        role: 'CITIZEN'
      };
      login(mockUser, 'demo-jwt-token');
      navigate('/dashboard/citizen');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <div className="w-full min-h-[800px] flex items-center justify-center bg-background p-4 sm:p-6 lg:p-8">
      <motion.div 
        className="w-full max-w-5xl h-[750px] grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Left side: Image Slider */}
        <div className="hidden lg:block relative h-full">
          <ImageSlider images={images} interval={4500} />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent p-8 flex flex-col justify-end text-white">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl bg-moh-600 flex items-center justify-center">
                <Cross className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold tracking-wider text-sm">MINISTRY OF HEALTH</span>
            </div>
            <h2 className="text-2xl font-extrabold">Create Digital Health Profile</h2>
            <p className="text-xs text-slate-300 mt-1 max-w-md">
              Register your Citizen Account to access personal immunization records, digital prescriptions, fast appointment bookings, and MOH health updates.
            </p>
          </div>
        </div>

        {/* Right side: Register Form */}
        <div className="w-full h-full bg-card text-card-foreground flex flex-col items-center justify-center p-6 md:p-10 overflow-y-auto">
          <motion.div 
            className="w-full max-w-sm"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-moh-600 to-teal-500 text-white flex items-center justify-center shadow-md">
                <UserPlus className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-sm text-moh-600 dark:text-teal-400">MOH SRI LANKA</span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-2xl font-extrabold tracking-tight mb-1 text-slate-900 dark:text-white">
              Create Citizen Profile
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xs text-muted-foreground mb-4">
              Enter your details to register for official MOH digital health services.
            </motion.p>

            {error && (
              <motion.div variants={itemVariants} className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl text-rose-600 dark:text-rose-300 text-xs flex items-center gap-2 mb-3">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            <motion.form variants={itemVariants} onSubmit={handleRegisterSubmit} className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="name" className="text-[11px] font-bold">Full Name *</Label>
                <Input
                  id="name"
                  type="text"
                  required
                  placeholder="e.g. Kamani Perera"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-xl text-xs h-9"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="nic" className="text-[11px] font-bold">NIC Number *</Label>
                  <Input
                    id="nic"
                    type="text"
                    required
                    placeholder="199056781234"
                    value={nic}
                    onChange={(e) => setNic(e.target.value)}
                    className="rounded-xl text-xs h-9"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="phone" className="text-[11px] font-bold">Mobile Phone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    placeholder="+94 77 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="rounded-xl text-xs h-9"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="email" className="text-[11px] font-bold">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="citizen@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl text-xs h-9"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="password" className="text-[11px] font-bold">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-xl text-xs h-9"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="division" className="text-[11px] font-bold">MOH Division</Label>
                  <select
                    id="division"
                    value={division}
                    onChange={(e) => setDivision(e.target.value)}
                    className="flex h-9 w-full rounded-xl border border-input bg-background px-3 py-1 text-xs font-bold text-slate-800 dark:text-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-moh-500"
                  >
                    <option value="Colombo Central">Colombo Central</option>
                    <option value="Kandy Municipal">Kandy Municipal</option>
                    <option value="Galle Four Gravets">Galle Four Gravets</option>
                    <option value="Jaffna">Jaffna</option>
                    <option value="Gampaha">Gampaha</option>
                  </select>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-10 mt-1 bg-gradient-to-r from-moh-600 to-teal-600 hover:from-moh-700 hover:to-teal-700 text-white font-extrabold text-xs rounded-xl shadow-md transition"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Create Citizen Profile"}
              </Button>
            </motion.form>

            <motion.p variants={itemVariants} className="text-center text-xs text-muted-foreground mt-4">
              Already have an account?{" "}
              <Link to="/login" className="font-bold text-moh-600 hover:underline">
                Sign In Here
              </Link>
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
